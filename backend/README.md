<h1 align="center" >
<img width="140" src="../frontend/src/assets/bula.svg">
<br>Bula
</h1>

## Installation

```bash
sudo apt-get update
sudo apt-get install redis
pip install flask
export FLASK_APP=main.py
export FLASK_ENV=development
flask run
```

```bash
docker run --name redis-bula -p 6379:6379 redis
```

## API Reference

#### Get all bulas

```http
  GET /all-bulas
```

#### Get all bulas of a user

```http
  GET /user-bulas?userId={userId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**. Id of the user. |
