import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IConcept } from 'src/app/core/models/concepts.model';
import { ITask } from 'src/app/core/models/task.model';
import { BackendService } from 'src/app/core/services/backend.service';

@Component({
  selector: 'kb-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  columns:string[] =[
    "title",
    "difficulty",
    "lastRecalled",
    "status",
    "resource",
    "completed"
  ]

  filterChoices:string[][] = [
    [
      "Cake",
      "Average",
      "Formiddable",
      "Impossible"
    ],
    [
      "Not Started",
      "In Progress",
      "Done"
    ]
  ]

  messages:string[] = [
    `Small steps motivate. Big steps overwhelm. - Maxime Lagacé`,
    `The first step is you have to say that you can. - Will Smith`,
    `A problem is a chance for you to do your best.- Duke Ellington `,
    `I am thankful to all who said no to me. 
     It is because of them that I’m doing it myself.- Albert Einstein`,
    `Be thankful for what you have; you’ll end up having more. - Oprah Winfrey`,
    `Try to be a rainbow in someone’s cloud. - Maya Angelou`,
    `With the new day comes new strength and new thoughts.  - Eleanor Roosevelt`,
    `Believe deep down in your heart that you’re destined to do great things - Joe Paterno`,
    `One person can make a difference, and everyone should try. - John F. Kennedy`,
    `Attitude is a little thing that makes a big difference. - Winston Churchill`,
    `I ask not for a lighter burden, but for broader shoulders. -  Jewish proverb`,
    `First say to yourself what you would be; and then do what you have to do. - Epictetus`,
    `The question isn’t who’s going to let me; it’s who is going to stop me. - Ayn Rand`,
    `I have decided to be happy, because it’s good for my health. - Voltaire`,
    `It doesn’t matter how slow you go, as long as you don’t stop. - Confucius`,
    `Always turn a negative situation into a positive situation. - Michael Jordan`,
    `The best way to predict the future is to create it. - Abraham Lincoln`,
    `The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt`,
    `Optimism is the faith that leads to achievement. 
      Nothing can be done without hope or confidence. - Helen Keller`
  ];

  concept:IConcept = {} as IConcept;
  tasks:ITask[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {concept:IConcept, tasks:ITask[]},
    private dialogRef: MatDialogRef<DetailComponent>
  ) { }

  ngOnInit(): void {
    this.concept = this.data.concept;
    this.tasks = this.data.tasks;
  }


  markApproved(event:IConcept) {
    console.dir(event);
    event.completed = true;
    this.dialogRef.close(event);
  }

}
