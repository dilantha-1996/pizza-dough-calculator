import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type DoughKey = 'classic' | 'mini' | 'xl' | 'cheesy' | 'deep';

interface DoughType {
  key: DoughKey;
  label: string;
  weight: number;
  color: string;
}

interface ResultRow {
  label: string;
  pans: number;
  doughPerPan: number;
  capacityGrams: number;
  capacityKg: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {

  // ==========================================
  // BATCH SIZE
  // ==========================================

  batchKg = 18;


  // ==========================================
  // DOUGH TYPES
  // ==========================================

  dough: Record<DoughKey, DoughType> = {

    classic: {
      key: 'classic',
      label: 'Classic',
      weight: 270,
      color: 'amber'
    },

    mini: {
      key: 'mini',
      label: 'Mini',
      weight: 160,
      color: 'sky'
    },

    xl: {
      key: 'xl',
      label: 'XL',
      weight: 400,
      color: 'violet'
    },

    cheesy: {
      key: 'cheesy',
      label: 'Cheesy Crust',
      weight: 300,
      color: 'rose'
    },

    deep: {
      key: 'deep',
      label: 'Deep',
      weight: 360,
      color: 'red'
    }

  };


  // ==========================================
  // CURRENT PAN COUNTS
  // ==========================================

  pans: Record<DoughKey, number> = {

    classic: 0,

    mini: 0,

    xl: 0,

    cheesy: 0,

    deep: 0

  };


  // ==========================================
  // CALCULATION RESULTS
  // ==========================================

  calculated = false;

  warning = '';

  result: ResultRow[] = [];

  totalPans = 0;

  totalPanCapacityGrams = 0;

  totalPanCapacityKg = 0;

  batchGrams = 0;

  capacityDifferenceGrams = 0;

  capacityDifferenceKg = 0;

  enough = false;


  // ==========================================
  // GETTERS
  // ==========================================

  get doughTypes(): DoughType[] {

    return [
      this.dough.classic,
      this.dough.mini,
      this.dough.xl,
      this.dough.cheesy,
      this.dough.deep
    ];

  }


  get batchGramsValue(): number {

    return Math.max(
      0,
      Number(this.batchKg) || 0
    ) * 1000;

  }


  // ==========================================
  // CALCULATE
  // ==========================================

  calculate(): void {

    this.calculated = true;

    this.warning = '';

    this.result = [];

    this.totalPans = 0;

    this.totalPanCapacityGrams = 0;

    this.totalPanCapacityKg = 0;

    this.capacityDifferenceGrams = 0;

    this.capacityDifferenceKg = 0;

    this.enough = false;


    // ------------------------------------------
    // Validate batch size
    // ------------------------------------------

    this.batchGrams = this.batchGramsValue;


    if (this.batchGrams <= 0) {

      this.warning =
        'Enter a batch size greater than 0 kg.';

      return;

    }


    // ------------------------------------------
    // Calculate capacity for every pan type
    // ------------------------------------------

    this.result = this.doughTypes.map(item => {

      const panCount = Math.max(
        0,
        Number(this.pans[item.key]) || 0
      );

      const doughPerPan = Math.max(
        0,
        Number(item.weight) || 0
      );

      const capacityGrams =
        panCount * doughPerPan;

      const capacityKg =
        capacityGrams / 1000;


      return {

        label: item.label,

        pans: panCount,

        doughPerPan: doughPerPan,

        capacityGrams: capacityGrams,

        capacityKg: capacityKg

      };

    });


    // ------------------------------------------
    // Total pans
    // ------------------------------------------

    this.totalPans = this.result.reduce(
      (total, row) => total + row.pans,
      0
    );


    // ------------------------------------------
    // Total dough capacity
    // ------------------------------------------

    this.totalPanCapacityGrams =
      this.result.reduce(
        (total, row) => total + row.capacityGrams,
        0
      );


    this.totalPanCapacityKg =
      this.totalPanCapacityGrams / 1000;


    // ------------------------------------------
    // Compare capacity with new batch
    // ------------------------------------------

    this.capacityDifferenceGrams =
      this.totalPanCapacityGrams - this.batchGrams;


    this.capacityDifferenceKg =
      this.capacityDifferenceGrams / 1000;


    this.enough =
      this.totalPanCapacityGrams >= this.batchGrams;

  }


  // ==========================================
  // RESET
  // ==========================================

  reset(): void {

    this.batchKg = 18;


    // Restore default dough weights

    this.dough.classic.weight = 270;

    this.dough.mini.weight = 160;

    this.dough.xl.weight = 400;

    this.dough.cheesy.weight = 300;

    this.dough.deep.weight = 360;


    // Reset pan counts

    this.pans = {

      classic: 0,

      mini: 0,

      xl: 0,

      cheesy: 0,

      deep: 0

    };


    // Reset results

    this.calculated = false;

    this.warning = '';

    this.result = [];

    this.totalPans = 0;

    this.totalPanCapacityGrams = 0;

    this.totalPanCapacityKg = 0;

    this.batchGrams = 0;

    this.capacityDifferenceGrams = 0;

    this.capacityDifferenceKg = 0;

    this.enough = false;

  }


  // ==========================================
  // TRACK BY
  // ==========================================

  trackByKey(
    _: number,
    item: DoughType
  ): DoughKey {

    return item.key;

  }

}