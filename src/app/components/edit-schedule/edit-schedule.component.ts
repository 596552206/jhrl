import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { ScheduleManager } from 'src/app/utils/schedule-manager/schedule-manager';
import { TimeManager } from 'src/app/utils/TimeManager/time-manager';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss'],
})
export class EditScheduleComponent implements OnInit {

  public timePicker : any;
  public schedule : any;

  constructor(private navParams : NavParams, public modalController : ModalController,public alertController : AlertController) {
    this.schedule = this.navParams.get("schedule");
    this.timePicker = {
      'max':TimeManager.timePickerRange.max,
      'min':TimeManager.timePickerRange.min,
      'start':this.schedule.start,
      'end':this.schedule.end,
      'format':'YYYY-MM-DD HH:mm'
    };
    //console.log(this.schedule);
   }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss();
  }

  async onFormSubmit(ev : any){
    if(this.schedule.title == ""){
      const alert = await this.alertController.create({
        header: '呃～',
        message: '事件标题不可为空。',
        buttons: ['知道了']
      });
      await alert.present();
    }else{
      let sm = new ScheduleManager();
      //console.log(this.schedule);
      let resl = sm.update(this.schedule);
      if(resl){
        console.log("成功");
        this.dismissModal();
        location.reload();
      }else{
        const alert = await this.alertController.create({
          header: '呃～',
          message: '时间格式错误。',
          buttons: ['知道了']
        });
        await alert.present();
      }
    }
  }

  deleteSchedule(ev : any){
    let sm = new ScheduleManager();
    sm.delete(this.schedule);
    this.dismissModal();
    location.reload();
  }

  
}