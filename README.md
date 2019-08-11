# Get The Image of A Particular Wizard:
```
// GET storage.googleapis.com/cheeze-wizards-production/{rinkeby address}/{wizard id}.svg
https://storage.googleapis.com/cheeze-wizards-production/0xec2203e38116f09e21bc27443e063b623b01345a/2.svg
```

# Get A Particular Wizard By ID
`https://cheezewizards.alchemyapi.io/wizards/{wizard ID}`

```
curl -X GET "https://cheezewizards.alchemyapi.io/wizards/1" \
-H "Content-Type: application/json" \
-H "x-api-token: XXXXXXXXXXXXXXXXXXXX" \
-H "x-email: drew@infiniteinternet.ca"
```

# Get All Duels That Ever Were
```
curl "https://cheezewizards.alchemyapi.io/duels" \
-H "Content-Type: application/json" \
-H "x-api-token: XXXXXXXXXXXXXXXXXXXX" \
-H "x-email: drew@infiniteinternet.ca"
```
# Get All Wizards
curl "https://cheezewizards.alchemyapi.io/wizards" \
-H "Content-Type: application/json" \
-H "x-api-token: XXXXXXXXXXXXXXXXXXXX" \
-H "x-email: drew@infiniteinternet.ca"

# Wizard Affinity Mappings: 
```
0 = NOTSET, 
1 = NEUTRAL, 
2 = FIRE, 
3 = WIND, 
4 = WATER
```