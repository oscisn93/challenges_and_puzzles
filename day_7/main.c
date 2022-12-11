#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX_LENGTH 100
#define MAX_LINES 25

typedef struct file {
  char *name;
  int size;
} file;

typedef struct dir {
  char *name;
  struct dir *parent;
  file **files;
  struct dir **children;
} dir;

void addFile(dir *d, file *f) {
  d->files++;
  *(d->files) = f;
}

dir *createDir(){

}

file *createFile(char *name, int size) {
  file *f = malloc(sizeof(file));
  f->name = name;
  f->size = size;
  return (file *)f;
}

int main() {
  FILE *fp;
  char line[MAX_LENGTH];
  int idx = 0;
  char *end;
  fp = fopen("test.txt", "r");
  if (!fp)
    return 1;
  while (fgets(line, MAX_LENGTH, fp)) {
    int size = strlen(line);
    if (line[size-1] == '\n') line[size-1] = '\0';
    // parseLine(&line);
    idx++;
  }
  fclose(fp);
  return 0;
}
