FROM php:5.6-cli

RUN apt-get update && apt-get install -y php5-mysql

COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

CMD ["php", "-dextension=/usr/lib/php5/20131226/mysqli.so", "-S", "0.0.0.0:80", "index.php"]
