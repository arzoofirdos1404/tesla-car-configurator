import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { colorsModel, configsModel, selectedConfigModel, selectedcolorModel } from '../../models/modelOptions';
import { CommonService } from '../../services/common.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-third-step',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.scss'
})
export class ThirdStepComponent implements OnInit {

  selectedConfigs: configsModel | null = null;
  model!: colorsModel;
  selectedColorCode!: string;
  modelCode!: string;
  selectedColor!: string;
  selectedImageUrl!: string;
  modeldesc!: string;
  towHitch!: boolean;
  yoke!: boolean;
  selectedConfigModel!: selectedConfigModel
  selectedcolorModel!: selectedcolorModel;

  constructor(private commonService: CommonService, private storageService: StorageService,) { }

  ngOnInit(): void {
    const model = this.storageService.retrieveModel();
    this.modeldesc = this.storageService.retrieveSelectedModel() || '';
    const colorDesc = this.storageService.retrieveSelectedColor();
    this.modelCode = model?.code || '';
    this.selectedColorCode = model?.colors.find(color => color.description === colorDesc)?.code || '';
    this.model = model?.colors.find(color => color.description === colorDesc) || this.selectedcolorModel;
    this.selectedConfigs = this.storageService.retrieveConfig() || this.selectedConfigModel;
    this.selectedColor = this.storageService.retrieveSelectedColor() || '';
    this.selectedImageUrl = this.commonService.fetchImageUrl(this.modelCode, this.selectedColorCode);
    const tow = this.storageService.retrieveTow('tow');
    const yoke = this.storageService.retrieveyoke('yoke');
    this.towHitch = tow || false;
    this.yoke = yoke || false;
  }

  getTotalCost(): number {
    let total = 0;

    if (this.selectedConfigs) {
      total += this.selectedConfigs.price || 0;
      total += this.model.price || 0;
      if (this.towHitch) {
        total += 1000;
      }
      if (this.yoke) {
        total += 1000;
      }
    }

    return total;
  }


}
