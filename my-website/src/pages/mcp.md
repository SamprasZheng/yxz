---
title: MCP
---


## MCP (Model Context Protocol)


MCP (Model Context Protocol) is a protocol for model context, designed to provide a unified way to describe and manipulate the context of a model. This protocol helps developers better manage and use models, and promotes interoperability between different systems. The primary goal of MCP is to simplify model usage and integration, and to provide a flexible framework that supports a wide variety of application scenarios.

MCP can be deployed in VS Code Cline or Cursor, and can use different servers to provide services. MCP servers can be local or remote, which gives it high flexibility and extensibility.


Commonly used MCP server configuration in mcp.json:

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
