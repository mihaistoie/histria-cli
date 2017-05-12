# histria-cli

## Layouts

### Structure
```application/json
{
    "type": "block",
    "items": [
        {
            "type": "block",
            "items": []
        },
        {
            "type": "block",
            "items": []
        }
    ]
}
```

### Layout Block

```application/json
{
    "type": "block",
    "items": []
}
```

### Layout Grid

```application/json
{
    "type": "grid",
    "items": [
        {
            "type": "cell",
            "options": {
                "size": 8
            }
            "items": []
        },
        {
            "type": "cell",
            "items": []
            "options": {
                "size": 4
            }
            
        }
    ]
}
```

### Layout Tabs

```application/json
{
    "type": "tabs",
    "items": [
        {
            "type": "tab",
            "items": []
        },
        {
            "type": "tab",
            "items": []
        }
    ]
}
```

