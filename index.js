const fs = require('fs');
const readline = require('readline');

const Data = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(Data);
const n = data.length;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function diff_hours(dt2, dt1) {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}



function Question1(){
    for (let i = 0; i < n; i++) 
    {
        let EMP_ID = data[i]['Position ID'];
        let consecutiveDays = 1;
        let j = i + 1;
        let maxDays = 1;
        
        if (data[i]['Time']) 
        {
            let prev = new Date(data[i]['Time'].substring(0, 11));
    
            while (j < n && data[j]['Position ID'] === EMP_ID) 
            {
                let next = new Date(prev);
                next.setDate(prev.getDate() + 1);
    
                if (data[j]['Time']) 
                {
                    const curr = new Date(data[j]['Time'].substring(0, 11));
                    if (curr.getDate() === prev.getDate()) 
                    {
                        j++;
                        continue;
                    }
    
                    if (curr.getDate() !== next.getDate()) {
                        consecutiveDays = 0;
                    }
    
                    consecutiveDays++;
                    maxDays = Math.max(maxDays, consecutiveDays);
                    prev = curr;
                } 
                else 
                {
                    j++;
                }
                j++;
            }
            i = j - 1;
            if (maxDays >= 7) 
            {
                const str = data[i]['Position ID'] + " " + data[i]['Employee Name'] + " " + data[i]['File Number'];
                fs.appendFile("Question1.txt", str + '\n', (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        } 
    }
    console.log("Query has been executed Successfully Check Ouput Text file as Question1.txt");
}

function Question2(){
    for (let i = 0; i < n; i++) 
    {
        let EMP_ID = data[i]['Position ID'];

        let j = i + 1;
        let bool = false;
        let prev = new Date(data[i]['Time']);

        while (j < n && data[j]['Position ID'] === EMP_ID) 
        {
            const curr = new Date(data[j]['Time']);

            if (curr.getDate() === prev.getDate()) 
            {
                let diff = diff_hours(prev, curr);
                if (diff >= 1 && diff <= 10) 
                {
                    bool = true;
                }

                j++;
                continue;
            }

            prev = curr;
            j++;
        }

        i = j - 1;
        if (bool === true) 
        {
            const str = `${data[i]['Position ID']} "${data[i]['Employee Name']}" ${data[i]['File Number']}\n`;
            fs.appendFile("Question2.txt", str, (err) => 
            {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
    console.log("Query has been executed Successfully Check Ouput Text file as Question2.txt");
}

function Question3(){
    for (let i = 0; i < n; i++) 
    {
        let timecardHours = data[i]['Timecard Hours (as Time)'];

        if (timecardHours && typeof timecardHours === 'string') 
        {
            let val = timecardHours.toString();
            
            let hours = parseInt(val.substring(0, 2), 10);
            let minutes = parseInt(val.substring(3, 5), 10);

            if (hours > 14 || (hours === 14 && minutes > 0)) 
            {
                const str = `${data[i]['Position ID']} "${data[i]['Employee Name']}" ${data[i]['File Number']}\n`;
                fs.appendFile("Question3.txt", str, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    }
    console.log("Query has been executed Successfully Check Ouput Text file as Question3.txt");
}

function banner() {
    console.log("\n**************************************************");
    console.log("             Bluejay Delivery Assignment          ");
    console.log("                  by - Prashant Sharma            ");
    console.log("  Final Year CSE Student at Chandigarh University ");
    console.log("**************************************************\n");
}

function menu()
{
    rl.question('\nEnter your choice (1, 2, or 3): \n1. Find employees who has worked for 7 consecutive days.\n2. Find employees who have less than 10 hours of time between shifts but greater than 1 hour\n3. Find employees Who has worked for more than 14 hours in a single shift\n', (choice) => {    
        switch (choice) {
            case '1':
                Question1();
                break;
            case '2':
                Question2();
                break;
            case '3':
                Question3();
                break;
            default:
                console.log('Invalid choice. Please enter 1, 2, or 3.');
                menu();
                break;
        }
        rl.close();
    });
}

banner();
menu();