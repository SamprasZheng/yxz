---
title: MCP
---


## MCP (Model context protocol)


MCP (Model Context Protocol) 是一個用於模型上下文的協議，旨在提供一個統一的方式來描述和操作模型的上下文。這個協議可以幫助開發者更好地管理和使用模型，並促進不同系統之間的互操作性。MCP 的主要目標是簡化模型的使用和集成，並提供一個靈活的框架來支持各種應用場景。

MCP可以部屬於vscode cline或是cursor，並且可以使用不同的server來提供服務。MCP server可以是本地的，也可以是遠端的，這使得它具有很高的靈活性和可擴展性。


常用的MCP server 配置於mcp.json

```json

"mcpServers": {
    "filesystem": {
    "command": "cmd",
    "args": [
        "/c",
        "npx",
        "@modelcontextprotocol/server-filesystem",
        "D:\\USER\\Desktop\\mcp"
    ]
    },
    "github": {
    "command": "cmd",
    "args": [
        "/c",
        "npx",
        "@modelcontextprotocol/server-github",
        "D:\\USER\\Desktop\\mcp"
    ]
    }
}



```