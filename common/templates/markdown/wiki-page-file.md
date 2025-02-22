---
title: {{&title}}
order: {{&order}}
index: {{&index}}
---
{{#blocks}}
<!-- 
#### **块类型\: {{&type}}**

---
-->

::: tabs

@tab 图形化

<img src="{{&imgPath}}" alt="模块" style="zoom:10%;" />

@tab 代码

```python
{{&code}}
```

:::
{{/blocks}}