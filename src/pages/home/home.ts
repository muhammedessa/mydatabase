import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { AddemployeePage } from '../addemployee/addemployee';
import { EditemployeePage } from '../editemployee/editemployee';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

data:any = [];

  constructor(public navCtrl: NavController,public sqlite:SQLite,public toast:Toast) {

  }



ionViewDidLoad(){
  this.getData();
}


doRefresh(refresher) {
  console.log('Begin async operation', refresher);
  this.getData();
  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}


refresh(){
  this.getData();
}

  getData(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })  .then((db: SQLiteObject) => {
  db.executeSql('CREATE TABLE IF NOT EXISTS employeess(id INTEGER PRIMARY KEY,name TEXT , lname TEXT ,age INT ,gender TEXT , salary INT , date TEXT)', {}).then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));


 db.executeSql('SELECT * FROM employeess ORDER BY id DESC',{} )
          .then(res=>{
            console.log('Executed SQL SELECT done' );
            this.data = [];
            for (var index = 0; index < res.rows.length; index++) {

              this.data.push({
                id :res.rows.item(index).id ,
                name:res.rows.item(index).name ,
                lname:res.rows.item(index).lname ,
                age:res.rows.item(index).age ,
                gender:res.rows.item(index).gender ,
                salary:res.rows.item(index).salary ,
                date :res.rows.item(index).date ,
              })
            }
          })  .catch(e => console.log(e));



      }) .catch(e => console.log(e));



    }


    addEmployee(){
      this.navCtrl.push(AddemployeePage);
    }

    editEmployee(id,name,lname ,age,gender, salary,date ){
      this.navCtrl.push(EditemployeePage,{
        id:id,
        name:name,
        lname:lname ,
        age:age,
        gender:gender,
        salary:salary,
        date:date

      });
    }




deleteEmployee(id){

  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })
    .then((db: SQLiteObject) => {
  db.executeSql('DELETE FROM employeess WHERE id=?', [id])
        .then(() =>{
          console.log('Executed SQL delete');

          this.toast.show('Done data Deleted!','5000','center').subscribe(
            toast => {
              this.getData();
            }
          );


        } ) .catch(e => console.log(e));
  }) .catch(e => console.log(e));

}



}
