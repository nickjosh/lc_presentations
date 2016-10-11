#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void timespec_diff(struct timespec *start, struct timespec *stop, struct timespec *result)
{
    if ((stop->tv_nsec - start->tv_nsec) < 0) {
        result->tv_sec = stop->tv_sec - start->tv_sec - 1;
        result->tv_nsec = stop->tv_nsec - start->tv_nsec + 1000000000;
    } else {
        result->tv_sec = stop->tv_sec - start->tv_sec;
        result->tv_nsec = stop->tv_nsec - start->tv_nsec;
    }

    return;
}

int main(int argc, char *argv[])
{
	size_t alloc = 0;
	char * space = NULL;
	struct timespec start, end, diff;
	for (int i = 0; i < 20; ++i) {
		alloc = 1 << i;
		printf("Allocating and filling %8zu bytes", alloc);
		clock_gettime(CLOCK_MONOTONIC, &start);
		space = malloc(sizeof(char) * alloc);
		clock_gettime(CLOCK_MONOTONIC, &end);
		timespec_diff(&start, &end, &diff);

		printf(" Done. Time = %9ld ns", diff.tv_nsec);
		printf(" %7.2f b/ns", ((double) alloc) / diff.tv_nsec);

		putchar('\n');
		free(space);
	}
	return 0;
}
