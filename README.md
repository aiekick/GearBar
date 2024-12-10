[![Generate vsix](https://github.com/aiekick/GearBar/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/aiekick/GearBar/actions/workflows/node.js.yml)

# GearBar

this extention give a gear button in the status bar for enable/disable vscode settings

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

you juste need to add your items in teh settings.json :

```json
    "gearbar.items": [
        {
        "setting": "workbench.editor.enablePreview",
        "label": "Enable/Disable preview mode",
        "icon": "$(zap)",
        "tooltip": "Preview mode gives you a persistent file sheet on click"
        }
    ]
```

**Enjoy!**
