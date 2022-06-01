from api.models import Document

documents = [
    {
        'name': 'first-document.txt',
        'description': 'First document description',
        'date': '2022-05-01'
    },
    {
        'name': 'second-document.txt',
        'description': 'Second document description',
        'date': '2022-05-15'
    },
    {
        'name': 'third-document.txt',
        'description': 'Third document description',
        'date': '2022-05-30'
    },
    {
        'name': 'today-document.txt',
        'description': 'Today document description',
    }
]

for document in documents:
    Document.objects.create(**document)