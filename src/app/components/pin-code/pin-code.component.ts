import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-pin-code',
  imports: [CommonModule],
  templateUrl: './pin-code.component.html',
  styleUrl: './pin-code.component.css',
})
export class PinCodeComponent implements OnInit {
  @Input() name: string = '';
  @Input() id: string = '';

  public inputValue: string = '';
  public isKeypadVisible: boolean = false;
  public keypadGridColumns: number = 4;
  public keypadGridRows: number = 4;
  public keypadItems: number[] = [];

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.generateKeypadItems();
  }

  private generateKeypadItems(): void {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const emptySpotsFill = -1;
    const keypadItemsCount = this.keypadGridColumns * this.keypadGridRows;
    const emptySpotsCount = keypadItemsCount - numbers.length;
    const allItems = [
      ...numbers,
      ...Array(emptySpotsCount).fill(emptySpotsFill),
    ];
    this.keypadItems = this.shuffleArray(allItems);
  }

  // Fisher-Yates Shuffle Algorithm
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (clickedInside && !this.isKeypadVisible) {
      this.isKeypadVisible = true;
    }
    if (!clickedInside && this.isKeypadVisible) {
      this.isKeypadVisible = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isKeypadVisible) {
      this.isKeypadVisible = false;
    }
  }

  public onInputKeydown(event: KeyboardEvent): void {
    if ((event.key === ' ' || event.key === 'Enter') && !this.isKeypadVisible) {
      event.preventDefault();
      this.isKeypadVisible = true;
    }
  }

  public onKeypadButtonClick(value: number): void {
    this.inputValue += value.toString();
  }

  public onKeypadButtonClearClick(): void {
    this.inputValue = '';
  }
}
