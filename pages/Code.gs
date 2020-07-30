// Maintained by qaisjp

function onOpen() {
  const ui = DocumentApp.getUi()
  ui.createMenu("Pages").addItem("Duplicate until first page break", "copyToBreak").addToUi()
}

function iprint(it, e) {
  let stringified = ""
  if (e == null) {
    stringified = "null/undefined"
  } else if (e.toString) {
    stringified = e.toString()
  } else {
    stringified = "who knows"
  }
  
  console.log(it, stringified, e.getType ? e.getType().toString() : "<getType missing>", e.getAttributes ? e.getAttributes() : "<getAttributes missing>")
}

function printSiblings(item) {
  while (true) {
    item = item.getNextSibling()
    console.log(item, item.getType().toString())
    if (item.isAtDocumentEnd()) {
      return
    }
  }
}

function copyToBreak() {
  const ui = DocumentApp.getUi()
  const doc = DocumentApp.getActiveDocument()
  const body = doc.getBody()
 
  const brk = body.findElement(DocumentApp.ElementType.PAGE_BREAK)
  if (brk == null) {
    ui.alert("Could not find first page break")
    return
  }
  
  const brkParaIndex = body.getChildIndex(brk.getElement().getParent())
  for (let i = 0; i <= brkParaIndex; i++) {
    const child = body.getChild(i).copy()
    const t = child.getType()
    const insertPos = brkParaIndex + i + 1
    if (t == DocumentApp.ElementType.PARAGRAPH) {
      body.insertParagraph(insertPos, child)
    } else if (t == DocumentApp.ElementType.LIST_ITEM) {
      body.insertListItem(insertPos, child)
    } else {
      ui.alert("Don't know how to handle " + t)
    }
  }
}
