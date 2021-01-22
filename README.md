# Nodejs-Socket-Redis
## Start redis server
```
    docker run --name packt-redis -p 16379:6379 -d redis:3.2.4
```
## Stop or restart redis server
```
    docker stop packt-redis
    docker start packt-redis
```
## Connect redis-cli
```
    docker run -it --link packt-redis:redis --rm redis redis-cli -h redis -p 6379
    docker run -it --rm redis redis-cli --help
```
## redis Data Types
* String
* Hashes
* Lists
* Sets
* Sorted sets
## Strings
```
    set user:1:username josh
    get user:1username
```
## Hashes
```
    hmset user:1 first_name Joshua last_name Johanan
    hgetall user:1
```
## Lists
```
    lpush user:1:profile_views 5 
    lpush user:1:profile_views 10 
    lpush user:1:profile_views 15 
    lpush user:1:profile_views 18
    lrange user:1:profile_views 0 -1 
```
## Sets
```
    sadd post:1:users 1 2
    sadd post:1:users 1
    sadd post:1:users 3
    smembers post:1:users
    sismember post:1:users 1
    srem post:1:users 1
    sadd dogs gizmo
    sadd dogs fido
    sadd dogs2 fido
    sadd dogs2 gizmo
    sdiff dogs dogs2
    sunion cat cat2
    sunion dogs dogs2
```
## Sorted lists
```
    zadd ligins 500 1
    zadd ligins 500 18
    zadd ligins 500 15
    zrange logins 0 -1
    zrange logins 0 -1 WITHSCORES
    zrange logins 0 -1 WITHSCORES
    zrevrange logins 0 -1
    zrangebyscore zdogs 100 250
```
## Another commands
```
    set counter 1
    incr counter
    get counter
    decr counter
    exists user:1
    set test-key test EX 10
    get test-key
    ttl test_key
    hmset hash_key first 1 second 2
    hkeys hash_key
```