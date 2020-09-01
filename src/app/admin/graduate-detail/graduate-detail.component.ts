import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Graduate } from 'src/app/models/graduate';
import { GraduateService } from 'src/app/services/graduate.service';

import { Email } from '../../../assets/js/smtp.js';

@Component({
  selector: 'app-graduate-detail',
  templateUrl: './graduate-detail.component.html',
  styleUrls: ['./graduate-detail.component.scss']
})
export class GraduateDetailComponent implements OnInit {

  private PKG_1 = 2200;
  private PKG_2 = 500;

  graduate$: Observable<Graduate>;
  currentDocId: string;

  confirmForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private gs: GraduateService,
    ) { }

  ngOnInit(): void {
    this.graduate$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.currentDocId = params.get('id');

        return this.gs.getGraduate(this.currentDocId);
      })
    );


    this.confirmForm = this.fb.group({
      initial_payment: ['', Validators.required]
    });


  }

  approve(status: boolean, graduate: Graduate): void {

    graduate.initial_payment = this.initial_payment.value;
    graduate.balance = this.getPaymentBalance(this.initial_payment.value, graduate.package);

    this.gs.approveGraduate(this.currentDocId, status, graduate).then(success => {
      this.sendEmail(graduate);
      this.router.navigate(['../'], {relativeTo: this.route});
    });

  }

  disapprove() {
    this.gs.approveGraduate(this.currentDocId, false).then(success => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }


  getPaymentBalance(initial_payment: number, shoot_package: string): number {

    if(shoot_package == 'Package 1') {
      return this.PKG_1 - initial_payment;
    }

    return this.PKG_2 - initial_payment;
  }



  sendEmail(graduate: Graduate): any {



    return Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'narcisskylake@gmail.com',
      Password : 'CC3CAB79238566800AD98CE1A53830EA756D',
      To : graduate.email,
      From :'ustpyb2020@gmail.com',
      Subject : 'USTP Yearbook 2020',
      Body : `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <title>
          </title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
          <style type="text/css">body, html {
            margin: 0px;
            padding: 0px;
            -webkit-font-smoothing: antialiased;
            text-size-adjust: none;
            width: 100% !important;
          }
            table td, table {
            }
            #outlook a {
              padding: 0px;
            }
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
              line-height: 100%;
            }
            .ExternalClass {
              width: 100%;
            }
            @media only screen and (max-width: 480px) {
              table, table tr td, table td {
                width: 100% ;
              }
              table tr td table.edsocialfollowcontainer  {
                width: auto;
              }
              img {
                width: inherit;
              }
              .layer_2 {
                max-width: 100% !important;
              }
              .edsocialfollowcontainer table {
                max-width: 25% !important;
              }
              .edsocialfollowcontainer table td {
                padding: 10px !important;
              }
              .edsocialfollowcontainer table {
                max-width: 25% !important;
              }
              .edsocialfollowcontainer table td {
                padding: 10px !important;
              }
            }
          </style>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700,700i &subset=cyrillic,latin-ext" data-name="open_sans" rel="stylesheet" type="text/css">
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css">
        </head>
        <body style="padding:0; margin: 0;background: #e4e6ec">
          <table style="height: 100%; width: 100%; background-color: #e4e6ec;" align="center">
            <tbody>
              <tr>
                <td valign="top" id="dbody" data-version="2.31" style="width: 100%; height: 100%; padding-top: 50px; padding-bottom: 50px; background-color: #e4e6ec;">
                  <!--[if (gte mso 9)|(IE)]><table align="center" style="max-width:600px" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                  <table class="layer_1" align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; box-sizing: border-box; width: 100%; margin: 0px auto;">
                    <tbody>
                      <tr>
                        <td class="drow" valign="top" align="center" style="background-color: #ffffff; box-sizing: border-box; font-size: 0px; text-align: center;">
                          <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                          <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                            <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                              <tbody>
                                <tr>
                                  <td valign="top" class="edtext" style="padding: 40px 20px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                    <p class="style1 text-center" style="text-align: center; margin: 0px; padding: 0px; color: #000000; font-size: 32px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">
                                      <strong>
                                      </strong>
                                      <span style="display:block; font-size: 16px;">THE 2020 EDITION</span>
                                      <strong>
                                        <span style="color: #0c1e70;">USTP YEARBOOK</span>
                                      </strong>
                                      <span style="display:block; font-size: 16px;">PUBLICATION</span>
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td class="drow" valign="top" align="center" style="background-color: #f4f4f3; box-sizing: border-box; font-size: 0px; text-align: center;">
                          <!--[if (gte mso 9)|(IE)]><table width="100%" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td valign="top"><![endif]-->
                          <div class="layer_2" style="max-width: 596px; display: inline-block; vertical-align: top; width: 100%;">
                            <table border="0" cellspacing="0" class="edcontent" style="border-collapse: collapse;width:100%">
                              <tbody>
                                <tr>
                                  <td valign="top" class="edtext" style="padding: 48px; text-align: left; color: #5f5f5f; font-size: 12px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; word-break: break-word; direction: ltr; box-sizing: border-box;">
                                    <p class="style2" style="margin: 0px; padding: 0px; color: #000000; font-size: 22px; font-family: &quot;Open Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;">Good day, ${graduate.first_name}!
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <br>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">This is to confirm your subscription to Yearbook 2020. This serves as our acknowledgment receipt of your payment. Details are as follows:</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">&nbsp;</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Date of pictorial: <strong>${graduate.shoot_date}</strong></span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Time: <strong>${graduate.shoot_time} ${graduate.time_period}</strong></span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Package: <strong>${graduate.package} [₱${graduate.package === 'Package 1' ? this.PKG_1 : this.PKG_2}]</strong></span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Amount paid: <strong>₱${graduate.initial_payment}.00</strong></span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Balance: <strong>₱${graduate.balance}.00</strong></span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">&nbsp;</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">For rules and regulations, please don't forget to read:</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <a href="http://bit.do/YEPB2020-Rules-and-Regulations" style="color: #5457ff; font-style:14px; text-decoration: none;">http://bit.do/YEPB2020-Rules-and-Regulations</a></p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">&nbsp;</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Thank you and God bless!</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">&nbsp;</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Regards,</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <span style="font-size: 14px; color: #3f3f3f;">Yearbook Editorial Publication Board 2020</span>
                                    </p>
                                    <p style="margin: 0px; padding: 0px;">
                                      <br>
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
      `
      });
  }




  get initial_payment(): AbstractControl {
    return this.confirmForm.get('initial_payment');
  }
}
