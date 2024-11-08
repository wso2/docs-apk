function downloadFile(event) {
    event.preventDefault();
    const url = event.target.href;
    const fileName = "EmployeeServiceDefinition.json";
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
}
