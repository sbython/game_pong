# WebSocket Closure Codes

| Code | Meaning | Common Cause |
|------|---------|--------------|
| 1000 | Normal Closure | The code explicitly called `socket.close()`. Everything worked fine. |
| 1006 | Abnormal Closure | This is the most common error. It means the connection dropped without the server sending a "Close" frame. Usually caused by a server crash, network cable pull, or the browser killing the connection. |
| 1001 | Going Away | The server is shutting down (restart) or the user navigated away from the page. |
| 1009 | Message Too Big | You tried to send a data packet larger than the server allows. |
| 1011 | Internal Error | The server encountered an error while processing a request and killed the connection. |