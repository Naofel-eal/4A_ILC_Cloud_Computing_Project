<h1 align="center" >
<img width="140" src="../frontend/src/assets/bula.svg">
<br>Bula
</h1>

# Installation

```bash
pip install redis
pip install Flask
pip install -U flask-cors
export FLASK_APP=main.py
export FLASK_ENV=development
flask run -p 8888
```

```bash
sudo apt-get update
sudo apt-get install redis
docker run --name redis-bula -p 6379:6379 redis
```

# API Reference

## Sign Up
Route to sign up.
```http
  GET /user/register
```

**Form Body :**
| Parameter | Type     | Description                         |
| :-------- | :------- | :--------------------------------   |
| `username`| `string` | **Required**. Name of the user.     |
| `password`| `string` | **Required**. Password of the user. |

**Return :**
User's token.

<br>

## Sign In
Route to sign in.
```http
  GET /user/login
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
Route to get all bulas of the application.
```http
  GET /bula/all-bulas
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**Return :**
```python
  {
    'bulas': [
      {
        'author': {userId of the author of the bula},
        'date': {date format "%d/%m/%Y %H:%M:%S"},
        'id': {id of the bula},
        'meows': [{userId}, ...],
        'rebulas': [{userId}, ...],
        'text': {text of the bula}
      },
      ...
    ]
  }
```

<br>

## Get all bulas of a user
Route to get all bulas of a specified user.
```http
  GET /bula/user-bulas
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**URL Arguments :**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`  | `string` | **Required**. Id of the user.     |

**Return :**
```python
  {
    'bulas': [
      {
        'author': {userId of the author of the bula},
        'date': {date format "%d/%m/%Y %H:%M:%S"},
        'id': {id of the bula},
        'meows': [{userId}, ...],
        'rebulas': [{userId}, ...],
        'text': {text of the bula}
      },
      ...
    ]
  }
```

<br>

## Post a bula
Route to post a bula.
```http
  POST /bula/post-bula
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**Form Body :**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `text`    | `string` | **Required**. Text of the bula.     |

<br>

## Get all hashtags
Route to get all hashtags of the application.
```http
  GET /bula/all-hashtags
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**Return :**
```python
  {
    'hashtags': [
      {
        'hashtag': {topic},
        'number': {number of appearances of the topic}
      }, 
      ...
    ]
  }
```

<br>

## Get all bulas of a topic
Route to get all bulas of a specified topic.
```http
  GET /bula/hashtag
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**URL Arguments :**
| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `hashtagId`| `string` | **Required**. Id of the topic.    |

**Return :**
```python
  {
    'bulas': [
      {
        'author': {userId of the author of the bula},
        'date': {date format "%d/%m/%Y %H:%M:%S"},
        'id': {id of the bula},
        'meows': [{userId}, ...],
        'rebulas': [{userId}, ...],
        'text': {text of the bula}
      },
      ...
    ]
  }
```

<br>

## Search
Route to get all content that match with the content.
```http
  GET /bula/research
```

**Header :**
| Parameter       | Type     | Description                       |
| :--------       | :------- | :-------------------------------- |
| `Authorization` | `string` | **Required**. User's token        |

**URL Arguments :**
| Parameter  | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `text`     | `string` | **Required**. Researched text     |

**Return :**
```python
  {
    'bulas': [
      {
        'author': {userId of the author of the bula},
        'date': {date format "%d/%m/%Y %H:%M:%S"},
        'id': {id of the bula},
        'meows': [{userId}, ...],
        'rebulas': [{userId}, ...],
        'text': {text of the bula}
      },
      ...
    ],
    'users': [
      { first userId },
      { second userId },
      ...
    ]
  }
```

<br>

## Load data
Route to load saved data (for simulation).
```http
  POST /load
```

<br>

## Reset all data
Route to clear all databases.
```http
  POST /bula/hashtag
```