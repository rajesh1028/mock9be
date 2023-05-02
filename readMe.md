| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /api/register | This endpoint should allow users to register. Hash the password on store. | 201 |
| GET | /api/users | This endpoint should return a list of all registered users. | 200 |
| GET | /api/users/:id/friends | This endpoint should return a list of all friends of a specific user identified by its ID. | 200 |
| POST | /api/users/:id/friends | This endpoint should allow the user to send a friend request to another user identified by its ID. | 201 |
| PUT / PATCH | /api/users/:id/friends/:friendId | This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID. | 204 |
| GET | /api/posts | This endpoint should return a list of all posts. | 200 |
| POST | /api/posts | This endpoint should allow the user to create a new post. | 201 |
| PUT / PATCH | /api/posts/:id | This endpoint should allow users to update the text or image of a specific post identified by its ID. | 204 |
| DELETE | /api/posts/:id | This endpoint should allow users to delete a specific post identified by its ID. | 202 |
| POST | /api/posts/:id/like | This endpoint should allow users to like a specific post identified by its ID. | 201 |
| POST | /api/posts/:id/comment | This endpoint should allow users to comment on a specific post identified by its ID. | 201 |
| GET | /api/posts/:id | This endpoint should return the details of a specific post identified by its ID. | 200 |
