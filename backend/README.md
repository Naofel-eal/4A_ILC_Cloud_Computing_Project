<h1 align="center" >
<img width="140" src="../frontend/src/assets/bula.svg">
<br>Bula
</h1>

# Installation

```bash
pip install redis
pip install Flask
export FLASK_APP=main.py
export FLASK_ENV=development
flask run
```

```bash
sudo apt-get update
sudo apt-get install redis
docker run --name redis-bula -p 6379:6379 redis
```

# API Reference

## Sign Up
---
Route to sign up.
```http
  GET /register
```

**Form Body :**
| Parameter | Type     | Description                         |
| :-------- | :------- | :--------------------------------   |
| `username`| `string` | **Required**. Name of the user.     |
| `password`| `string` | **Required**. Password of the user. |

<br>

## Sign In
---
Route to sign in.
```http
  GET /login
```

**Form Body :**
| Parameter | Type     | Description                         |
| :-------- | :------- | :--------------------------------   |
| `username`| `string` | **Required**. Name of the user.     |
| `password`| `string` | **Required**. Password of the user. |

**Return :**
User's token.

<br>

## Get all bulas
---
Route to get all bulas of the application.
```http
  GET /all-bulas
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**Return :**
```python
  {
    'bulas': [
      ...
    ]
  }
```

<br>

## Get all bulas of a user
---
Route to get all bulas of a specified user.
```http
  GET /user-bulas
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**Form Body :**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `string` | **Required**. Id of the user.     |

**Return :**
```python
  {
    'bulas': [
      ...
    ]
  }
```