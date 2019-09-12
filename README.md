The API's only endpoint is http://api_ip:8000/api

To list projects, send a GET request to the endpoint:
```http
GET http://api_ip:8000/api
```

To add a project, send a POST request with a JSON body containing all and only these keys:
* `title` (required, string)
* `url` (required, string)
* `description` (required, string)

Example:
```http
POST http://api_ip:8000/api
Content-Type: application/json
```
```json
{
	"title": "...",
	"url": "...",
	"description": "..."
}
```

To update a project, send a PUT request with a JSON body containing any and only these keys:
* `id` (required, integer)
* `title` (optional, string)
* `url` (optional, string)
* `description` (optional, string)

Example:
```http
PUT http://api_ip:8000/api
Content-Type: application/json
```
```json
{
	"id": 1,
	"title": "...",
	"url": "...",
	"description": "..."
}
```

To delete a project, send a DELETE request with a JSON body containing only this key:
* `id` (required, integer)

Example:
```http
POST http://api_ip:8000/api
Content-Type: application/json
```
```json
{
	"id": 1
}
```
