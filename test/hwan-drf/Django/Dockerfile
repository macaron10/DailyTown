FROM python:3.8.6
ENV PYTHONUNBUFFERED=1
RUN mkdir /code
WORKDIR /code
RUN apt update
RUN apt -y install libgl1-mesa-glx
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY . /code/