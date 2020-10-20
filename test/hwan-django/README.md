{:toc}

## Docker-compose
> docker-compose를 통한 app 실행

[Django naming convention](https://stackoverflow.com/questions/3098681/is-there-a-naming-convention-for-django-apps)

1. 이미 django PJT를 진행 중 일때
    ```bash
    docker-compose up
    ```

2. Docker Terminal접근 할 때
    ```bash
    docker exec -it <docker container id> bash
    ```

3. startproject 할 때, 처음 PJT 시작할 때 명령어
    ```bash
    docker-compose run web django-admin startproject testapp .
    ```
