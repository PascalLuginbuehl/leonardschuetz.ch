const filter_fields = document.querySelectorAll("input")

function fetchData(filters, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open("POST", "/apps/m151web/api/list", true)
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.addEventListener("load", () => callback(JSON.parse(xhr.responseText, xhr)))
  xhr.send(JSON.stringify({
    filters
  }))
}

function handleFilter(event) {
  event.preventDefault()

  const firstname = filter_fields[0].value
  const lastname = filter_fields[1].value
  const note = filter_fields[2].value

  fetchData({
    firstname, lastname, note
  }, (data) => {
  })
}

function createTableEntry(data) {
  const element = document.createElement("div")
  element.className = "table_entry"
  const form = document.createElement("form")
}
