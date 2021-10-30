import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/SelectModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { EnvironmentVariableService } from '../environmentvariable.service';
import { CreateEnvVariableModel } from '../models/CreateEnvVariableModel';
import { UpdateEnvVariableModel } from '../models/UpdateEnvVariableModel';

@Component({
  selector: 'app-createenvironmentvariable',
  templateUrl: './createenvironmentvariable.component.html',
  styleUrls: ['./createenvironmentvariable.component.scss'],
})
export class CreateEnvironmentVariableComponent implements OnInit {
  @Output() environmentVariableEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  environmentValueTypes!: SelectModel[];
  environmentVariableForm: FormGroup;
  files: File[] = [];
  customerDetail!: CustomerDetail;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      customerDetail: CustomerDetail;
      environmentId: number;
      envVariableId: number;
    },
    private dialogRef: MatDialogRef<CreateEnvironmentVariableComponent>,
    private environmentVariableService: EnvironmentVariableService,
    private snackbarService: SnackbarService
  ) {
    this.environmentVariableForm = new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      valueType: new FormControl('text', Validators.required),
      comments: new FormControl(''),
    });
    if (this.data.envVariableId) {
      this.environmentVariableService
        .getEnvVariablesById(this.data.environmentId, this.data.envVariableId)
        .subscribe(
          (res) => {
            this.environmentVariableForm.get('key')!.setValue(res.key);
            this.environmentVariableForm.get('value')!.setValue(res.value);
            this.environmentVariableForm.get('valueType')!.setValue(res.type);
            this.environmentVariableForm
              .get('comments')!
              .setValue(res.comments);
          },
          (err) => {
            this.snackbarService.openSnackBar(
              'error while loading environment variable'
            );
          }
        );
    }
  }

  ngOnInit(): void {
    this.environmentValueTypes = [
      { text: 'Text', value: 'text' },
      { text: 'File', value: 'file' },
    ];
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  createEnvironmentVariable() {
    if (this.data.envVariableId) {
      this.updateEnvironmentVariable();
      return;
    }
    let createEnvVariableModel: CreateEnvVariableModel = {
      comments: this.environmentVariableForm.get('comments')!.value,
      key: this.environmentVariableForm.get('key')!.value,
      type: this.environmentVariableForm.get('valueType')!.value,
      userId: this.data.customerDetail.userId,
      value: this.environmentVariableForm.get('value')!.value,
    };
    this.environmentVariableService
      .createEnvVariable(this.data.environmentId, createEnvVariableModel)
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'successfull created environment variable'
          );
          this.dialogRef.close();
          this.environmentVariableEvent.emit('success');
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while creating environment variables'
          );
        }
      );
  }

  updateEnvironmentVariable() {
    let updateEnvVariableModel: UpdateEnvVariableModel = {
      comments: this.environmentVariableForm.get('comments')!.value,
      key: this.environmentVariableForm.get('key')!.value,
      type: this.environmentVariableForm.get('valueType')!.value,
      userId: this.data.customerDetail.userId,
      value: this.environmentVariableForm.get('value')!.value,
    };
    this.environmentVariableService
      .updateEnvVariable(
        this.data.environmentId,
        this.data.envVariableId,
        updateEnvVariableModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'successfull created environment variable'
          );
          this.dialogRef.close();
          this.environmentVariableEvent.emit('success');
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while creating environment variables'
          );
        }
      );
  }
}
