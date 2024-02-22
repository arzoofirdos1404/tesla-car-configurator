

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { CarModelOptions, colorsModel,selectedConfigModel } from '../../models/modelOptions';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-first-step',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSelectModule,
    MatFormFieldModule, MatInputModule],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})


export class FirstStepComponent implements OnInit {

  models!: CarModelOptions[];
  selectedModel!: string;
  model!: string;
  colorList!: colorsModel[];
  selectedColor!: string;
  selectedImageUrl!: string;
  modelCode!: string;
  selectedColorCode!: string;
  selectedModelCode!: string;
  selectedConfigModel: selectedConfigModel ={id: 0,
    description:  '',
    range: 0,
    speed: 0,
    price: 0};

  constructor(private commonService: CommonService, private storageService: StorageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.loadModelOptions();
    this.showimg();
  }


  onModelSelection(event: any): void {
    this.storageService.storeSelectedModel(this.selectedModel);
    this.storageService.storeModel(this.models.find(model => model.description === event.value) || { code: '', description: '', colors: [] });
    this.colorList = this.models?.find(model => model.description === event.value)?.colors || [];
    if (this.selectedColor && this.colorList) {
      this.selectedColor = this.colorList[0]?.description;
      this.storageService.storeSelectedColor(this.selectedColor);
    }
    this.showimg();
  }

  onColorSelection(event: any): void {
    this.selectedImageUrl = this.commonService.fetchImageUrl(this.selectedModel, this.selectedColor);
    this.storageService.storeSelectedColor(event.value);
    this.showimg();
  }

  showimg() {
    this.selectedColorCode = this.colorList?.find(color => color.description === this.selectedColor)?.code || '';
    this.selectedModelCode = this.models?.find(model => model.description === this.selectedModel)?.code || '';
    this.selectedImageUrl = this.commonService.fetchImageUrl(this.selectedModelCode, this.selectedColorCode);
  }

  loadModelOptions(): void {
    this.http.get<CarModelOptions[]>('/models').subscribe({
      next: options => {
      this.models = options;
      this.selectedModel = this.storageService.retrieveSelectedModel() || '';
      this.colorList = this.models?.find(model => model.description === this.selectedModel)?.colors || [];
      this.selectedColor = this.storageService.retrieveSelectedColor() || '';
      this.showimg();
      this.storageService.storeConfig(this.selectedConfigModel);
      this.storageService.storeSelectedConfig('');
      },
      error: (error) => {
        console.error('Error loading options:', error);
      }
    })
  }

}
