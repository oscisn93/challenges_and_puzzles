//
//  memmgr_choice3.c
//  memmgr
//
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

#define ARGC_ERROR 1
#define FILE_ERROR 2
#define BUFLEN 256
#define FRAME_SIZE 256

char main_mem[65536];
char main_mem_fifo[32768]; // 128 physical frames
int page_queue[128];
int qhead = 0, qtail = 0;
int tlb3[64][2];
int tlb[16][2];
int current_tlb_entry = 0;
int current_tlb3_entry = 0;
int page_table[256];
int current_frame = 0;
FILE *fstore;

// data for statistics
int pfc[5], pfc2[5];     // page fault count
int tlbh[5], tlbh2[5], tlbh3[5];   // tlb hit count
int count[5], count2[5]; // access count

int pfc_prev_hit = 0;
int tlb_prev_hit = 0;
int tlb3_prev_hit = 0;

#define PAGES 256
#define FRAMES_PART1 256
#define FRAMES_PART2 128

//-------------------------------------------------------------------
signed getpage(unsigned x) { return (0xff00 & x) >> 8; }

signed getoffset(unsigned x) { return (0xff & x); }

void getpage_offset(unsigned x, unsigned *ppage, unsigned *poffset)
{
  *ppage = getpage(x);
  *poffset = getoffset(x);
  printf("x is: %u, page: %u, offset: %u, address: %u, paddress: %u\n", x, *ppage, *poffset,
         (*ppage << 8) | getoffset(x), *ppage * 256 + *poffset);
}

int tlb_contains(unsigned x)
{
  for (int i = 0; i < 16; i++)
  {
    if (tlb[i][0] == x)
    {
      return i;
    }
  }
  return -1;
}

int tlb3_contains(unsigned x)
{
  for (int i = 0; i < 64; i++)
  {
    if (tlb3[i][0] == x)
    {
      return i;
    }
  }
  return -1;
}

void update_tlb(unsigned page)
{
  tlb[current_tlb_entry][0] = page;
  tlb[current_tlb_entry][1] = page_table[page];
  current_tlb_entry = (current_tlb_entry + 1) % 16; // round-robin
}

void update_tlb3(unsigned page)
{
  tlb3[current_tlb3_entry][0] = page;
  tlb3[current_tlb3_entry][1] = page_table[page];
  current_tlb3_entry = (current_tlb3_entry + 1) % 64; // round-robin
}

unsigned getframe(FILE *fstore, unsigned logic_add, unsigned page,
                  int *page_fault_count, int *tlb_hit_count, int *tlb3_hit_counts)
{

  int tlb_index = tlb_contains(page);
  int tlb3_index = tlb3_contains(page);
  if (tlb_index != -1)
  {
    (*tlb_hit_count)++;
    return tlb[tlb_index][1];
  } else if (tlb3_index != -1){
    (*tlb3_hit_counts)++;
    return tlb3[tlb3_index][1];
  }

  // tlb miss
  // if page table hit
  if (page_table[page] != -1)
  {
    update_tlb(page);
    update_tlb3(page);
    return page_table[page];
  }

  // page table miss -> page fault
  // find page location in backing_store
  int offset = (logic_add / FRAME_SIZE) * FRAME_SIZE;
  fseek(fstore, offset, 0);

  // bring data into memory, update tlb and page table
  page_table[page] = current_frame;
  current_frame = (current_frame + 1) % 256;
  (*page_fault_count)++;
  fread(&main_mem[page_table[page] * FRAME_SIZE], sizeof(char), 256, fstore);
  update_tlb(page);
  update_tlb3(page);
  return page_table[page];
}

int get_available_frame(unsigned page)
{
  // empty queue
  if (qhead == 0 && qtail == 0 && page_queue[qhead] == -1)
  {
    ++qtail;
    page_queue[qhead] = page;
    return qhead;
  }

  // queue not full
  if (page_queue[qtail] == -1)
  {
    page_queue[qtail] = page;
    int val = qtail;
    qtail = (qtail + 1) % 128;
    return val;
  }

  // queue full
  if (qhead == qtail && page_queue[qtail] != -1)
  {
    page_queue[qhead] = page;
    int val = qhead;
    qhead = (qhead + 1) % 128;
    qtail = (qtail + 1) % 128;
    return val;
  }
  return -1; // failed to find a value
}

unsigned getframe_fifo(FILE *fstore, unsigned logic_add, unsigned page,
                       int *page_fault_count, int *tlb_hit_count, int *tlb3_hit_count)
{
  // tlb hit
  int tlb_index = tlb_contains(page);
  int tlb3_index = tlb3_contains(page);
  if (tlb_index != -1)
  {
    if (page_queue[tlb[tlb_index][1]] == page)
    {
      (*tlb_hit_count)++;
      return tlb[tlb_index][1];
    }
  }
  else if (tlb3_index != -1)
  {
    if (page_queue[tlb3[tlb3_index][1]] == page)
    {
      (*tlb3_hit_count)++;
      return tlb3[tlb3_index][1];
    }
  }
  // tlb miss, page table hit
  if (page_table[page] != -1 && page_queue[page_table[page]] == page)
  {
    update_tlb(page);
    return page_table[page];
  }

  // page table miss -> page fault
  // find location in backing_store
  int offset = (logic_add / FRAME_SIZE) * FRAME_SIZE;
  fseek(fstore, offset, 0);

  // bring data into memory, update tlb and page table
  int available_frame = get_available_frame(page);
  fread(&main_mem_fifo[available_frame * FRAME_SIZE], sizeof(char), 256, fstore);
  page_table[page] = available_frame;
  (*page_fault_count)++;
  update_tlb(page);
  return page_table[page];
}

void open_files(FILE **fadd, FILE **fcorr, FILE **fstore)
{
  *fadd = fopen("addresses.txt", "r"); // open file addresses.txt  (contains the logical addresses)
  if (*fadd == NULL)
  {
    fprintf(stderr, "Could not open file: 'addresses.txt'\n");
    exit(FILE_ERROR);
  }

  *fcorr = fopen("correct.txt", "r"); // contains the logical and physical address, and its value
  if (*fcorr == NULL)
  {
    fprintf(stderr, "Could not open file: 'correct.txt'\n");
    exit(FILE_ERROR);
  }

  *fstore = fopen("BACKING_STORE.bin", "rb");
  if (*fstore == NULL)
  {
    fprintf(stderr, "Could not open file: 'BACKING_STORE.bin'\n");
    exit(FILE_ERROR);
  }
}

void close_files(FILE *fadd, FILE *fcorr, FILE *fstore)
{
  fclose(fcorr);
  fclose(fadd);
  fclose(fstore);
}

void simulate_pages_frames_equal(void)
{
  char buf[BUFLEN];
  unsigned page, offset, physical_add, frame = 0;
  unsigned logic_add;                 // read from file address.txt
  unsigned virt_add, phys_add, value; // read from file correct.txt

  FILE *fadd, *fcorr, *fstore;
  open_files(&fadd, &fcorr, &fstore);

  // Initialize page table, tlb
  memset(page_table, -1, sizeof(page_table));
  for (int i = 0; i < 16; ++i)
  {
    tlb[i][0] = -1;
  }
  for (int i = 0; i < 64; ++i)
  {
    tlb[i][0] = -1;
  }

  int access_count = 0, page_fault_count = 0, tlb_hit_count = 0, tlb3_hit_count;
  current_frame = 0;
  current_tlb_entry = 0;
  current_tlb3_entry = 0;

  printf("\n Starting nPages == nFrames memory simulation...\n");

  while (fscanf(fadd, "%d", &logic_add) != EOF)
  {
    ++access_count;

    fscanf(fcorr, "%s %s %d %s %s %d %s %d", buf, buf, &virt_add,
           buf, buf, &phys_add, buf, &value); // read from file correct.txt

    // fscanf(fadd, "%d", &logic_add);  // read from file address.txt
    page = getpage(logic_add);
    offset = getoffset(logic_add);
    frame = getframe(fstore, logic_add, page, &page_fault_count, &tlb_hit_count, &tlb3_hit_count);

    physical_add = frame * FRAME_SIZE + offset;
    int val = (int)(main_mem[physical_add]);

    // update tlb hit count and page fault count every 200 accesses
    if (access_count > 0 && access_count % 200 == 0)
    {
      tlbh[(access_count / 200) - 1] = tlb_hit_count;
      tlbh3[(access_count / 200) - 1] = tlb3_hit_count;
      pfc[(access_count / 200) - 1] = page_fault_count;
      count[(access_count / 200) - 1] = access_count;
    }

    printf("logical: %5u (page: %3u, offset: %3u) ---> physical: %5u -> value: %4d  ok  #hits: %d  %d  %s  %s\n", logic_add, page, offset, physical_add, val, page_fault_count, tlb_hit_count, (page_fault_count > pfc_prev_hit ? "PgFAULT" : ""), (tlb_hit_count > tlb_prev_hit) ? "         TLB HIT" : "");
    if (access_count % 5 == 0)
    {
      printf("\n");
    }
    if (access_count % 50 == 0)
    {
      printf("========================================================================================================== %d\n\n", access_count);
    }

    pfc_prev_hit = page_fault_count;
    tlb_prev_hit = tlb_hit_count;
    tlb3_prev_hit = tlb3_hit_count;

    assert(physical_add == phys_add);
    assert(value == val);
  }
  fclose(fcorr);
  fclose(fadd);
  fclose(fstore);

  printf("ALL logical ---> physical assertions PASSED!\n");
  printf("ALL read memory value assertions PASSED!\n");

  printf("\n\t\t... nPages == nFrames memory simulation done.\n");
}

void simulate_pages_frames_not_equal(void)
{
  char buf[BUFLEN];
  unsigned page, offset, physical_add, frame = 0;
  unsigned logic_add;                 // read from file address.txt
  unsigned virt_add, phys_add, value; // read from file correct.txt

  printf("\n Starting nPages != nFrames memory simulation...\n");

  // Initialize page table, tlb, page queue
  memset(page_table, -1, sizeof(page_table));
  memset(page_queue, -1, sizeof(page_queue));
  for (int i = 0; i < 16; ++i)
  {
    tlb[i][0] = -1;
  }
  for (int i = 0; i < 64; ++i)
  {
    tlb3[i][0] = -1;
  }

  int access_count = 0, page_fault_count = 0, tlb_hit_count = 0, tlb3_hit_count;
  qhead = 0;
  qtail = 0;

  FILE *fadd, *fcorr, *fstore;
  open_files(&fadd, &fcorr, &fstore);

  while (fscanf(fadd, "%d", &logic_add) != EOF)
  {
    ++access_count;

    fscanf(fcorr, "%s %s %d %s %s %d %s %d", buf, buf, &virt_add,
           buf, buf, &phys_add, buf, &value); // read from file correct.txt

    // fscanf(fadd, "%d", &logic_add);  // read from file address.txt
    page = getpage(logic_add);
    offset = getoffset(logic_add);
    frame = getframe_fifo(fstore, logic_add, page, &page_fault_count, &tlb_hit_count, &tlb3_hit_count);

    physical_add = frame * FRAME_SIZE + offset;
    int val = (int)(main_mem_fifo[physical_add]);

    // update tlb hit count and page fault count every 200 accesses
    if (access_count > 0 && access_count % 200 == 0)
    {
      tlbh2[(access_count / 200) - 1] = tlb_hit_count;
      tlbh3[(access_count / 200) - 1] = tlb3_hit_count;
      pfc2[(access_count / 200) - 1] = page_fault_count;
      count2[(access_count / 200) - 1] = access_count;
    }

    //    printf("logical: %5u (page: %3u, offset: %3u) ---> physical: %5u -> value: %4d  ok\n", logic_add, page, offset, physical_add, val);
    //    if (access_count % 5 ==  0) { printf("\n"); }
    printf("logical: %5u (page: %3u, offset: %3u) ---> physical: %5u -> value: %4d  ok  #hits: %d  %d  %s  %s\n", logic_add, page, offset, physical_add, val, page_fault_count, tlb_hit_count,
           (page_fault_count > pfc_prev_hit ? "PgFAULT" : ""),
           (tlb_hit_count > tlb_prev_hit) ? "         TLB HIT" : (tlb3_hit_count > tlb3_prev_hit) ? "         TLB3 HIT"
                                                                                                  : "");
    if (access_count % 5 == 0)
    {
      printf("\n");
    }
    if (access_count % 50 == 0)
    {
      printf("========================================================================================================== %d\n\n", access_count);
    }

    pfc_prev_hit = page_fault_count;
    tlb_prev_hit = tlb_hit_count;
    tlb3_prev_hit = tlb3_hit_count;

    assert(value == val);
  }
  close_files(fadd, fcorr, fstore);

  printf("ALL read memory value assertions PASSED!\n");
  printf("\n\t\t... nPages != nFrames memory simulation done.\n");
}

int main(int argc, const char *argv[])
{
  // initialize statistics data
  for (int i = 0; i < 5; ++i)
  {
    pfc[i] = pfc2[i] = 0;
    tlbh[i] = tlbh2[i] = tlbh3[i] = 0;
    count[i] = count2[i] = 0;
  }

  simulate_pages_frames_equal();     // 256 physical frames
  simulate_pages_frames_not_equal(); // 128 physical frames

  // Statistics
  printf("\n\nnPages == nFrames Statistics (256 frames):\n");
  printf("Access count   Tlb hit count   Tlb3 hit count   Page fault count   Tlb hit rate   Tlb3 hit rate   Page fault rate\n");
  for (int i = 0; i < 5; ++i)
  {
    printf("%9d %12d %12d %18d %18.4f %18.4f %14.4f\n",
           count[i], tlbh[i], tlbh3[i], pfc[i],
           1.0f * tlbh[i] / count[i], 1.0f * tlbh3[i] / count[i], 1.0f * pfc[i] / count[i]);
  }

  printf("\nnPages != nFrames Statistics (128 frames):\n");
  printf("Access count   Tlb hit count   Tlb3 hit count   Page fault count   Tlb hit rate   TLB3 hit rate   Page fault rate\n");
  for (int i = 0; i < 5; ++i)
  {
    printf("%9d %12d %12d %18d %18.4f %18.4f %14.4f\n",
           count2[i], tlbh2[i], tlbh3[i], pfc2[i],
           1.0f * tlbh2[i] / count2[i], 1.0f * tlbh3[i] / count2[i], 1.0f * pfc2[i] / count2[i]);
  }
  printf("\n\t\t...memory management simulation completed!\n");

  return 0;
}
