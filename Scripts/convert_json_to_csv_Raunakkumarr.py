import json
import csv

questions = []
option1 =[]
option2 =[]
option3 = []
option4 = []
optioncor = []

def get_json():
    data = json.load(open('mock.json'))
    for i in data['Mocktest']:
        questions.append(i['Question'])
        option1.append(i['option1'])
        option2.append(i['option2'])
        option3.append(i['option3'])
        option4.append(i['option4'])
        optioncor.append(i['opc'])

def update_csv():
    get_json()
    with open('set5.csv','w') as csvfile:
        fieldnames = ['Question', 'option1', 'option2', 'option3', 'option4', 'optionCorrect']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        a = 0
        m = len(questions)
        for n in range(a, m):
            writer.writerow({'Question': questions[n], 'option1': option1[n], 'option2': option2[n], 'option3': option3[n], 'option4': option4[n], 'optionCorrect': optioncor[n]})
        #for a in questions:
            #writer.writerow({'Question': a, 'last_name': 'Beans'})

update_csv()
