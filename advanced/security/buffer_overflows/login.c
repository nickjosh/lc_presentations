#include <arpa/inet.h>
#include <errno.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>

int main(void)
{
    struct bad_t {
        char buff[15];
        int pass;
    };

    struct bad_t x;
    struct sockaddr_in serv_addr;
    char buff[1025];
    int port = 5000;

    int sockno = socket(AF_INET, SOCK_STREAM, 0);
    int connfd = 0;

    memset(&serv_addr, '0', sizeof(serv_addr));
    memset(buff, '0', sizeof(buff));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    serv_addr.sin_port = htons(port);

    if (bind(sockno, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) == -1) {
        perror("bind");
        abort();
    }

    if (listen(sockno, 10) == -1) {
        perror("listen");
        abort();
    } else {
        printf("Listening on port %d\n", port);
    }

    while (1) {
        connfd = accept(sockno, (struct sockaddr*)NULL, NULL);

        x.pass = 0;
        snprintf(buff, sizeof(buff), "Enter the password\n");
        write(connfd, buff, strlen(buff)); 
        read(connfd, buff, sizeof(buff));

        size_t passlen = strchr(buff, '\n') - buff;
        strncpy(x.buff, buff, passlen);

        printf("Given pass: %s\n", x.buff);

        if(strcmp(x.buff, "launchcode\n"))
        {
            send(connfd, "Wrong Password\n", 16, 0);
        }
        else
        {
            send(connfd, "Correct Password\n", 19, 0);
            x.pass = 1;
        }


        if(x.pass)
        {
            send(connfd, "Here's the secret!\n", 19 ,0);
        }

        close(connfd);
    }

    return 0;
}
