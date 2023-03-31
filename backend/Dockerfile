FROM python:3.8

RUN apt-get update
RUN apt-get install python3-pip -y
RUN pip3 install flask
RUN pip3 install -U flask-cors
RUN pip3 install redis

COPY . .

ENV FLASK_APP=main.py
ENV FLASK_ENV=development

EXPOSE 8888

CMD ["flask", "run", "--host=0.0.0.0", "--port=8888"]