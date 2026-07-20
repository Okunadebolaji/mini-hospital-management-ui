import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NurseAssignmentService } from '../../services/nurse-assignment';
import { NurseImageService } from '../../services/nurse-image.service';

@Component({
  selector: 'app-nurse-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nurse-detail.html',
  styleUrl: './nurse-detail.css'
})
export class NurseDetail implements OnInit {
  nurseId!: number;
  nurseName = '';
  assignments: any[] = [];
  loading = true;
  error = '';
  isDarkMode = false;
  nurseImageUrl: string | null = null;
  selectedFile: File | null = null;

  mostCommonReason = '';
  mostUsedRoom = '';

  constructor(
    private route: ActivatedRoute,
    private nurseAssignmentService: NurseAssignmentService,
    private renderer: Renderer2,
    private nurseImageService: NurseImageService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = document.body.classList.contains('dark-mode') || localStorage.getItem('theme') === 'dark';
    this.updateThemeClass();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.nurseId = idParam ? Number(idParam) : NaN;

      if (isNaN(this.nurseId)) {
        this.error = 'Invalid nurse ID.';
        this.loading = false;
        return;
      }

      console.log('🆔 Loaded Nurse Detail for ID:', this.nurseId);
      this.loadAssignments();
      this.loadNurseImage();
    });
  }

  loadAssignments() {
  this.loading = true;
  this.error = '';

  this.nurseAssignmentService.getAssignmentsForNurse(this.nurseId).subscribe({
    next: (data) => {
      if (!Array.isArray(data)) {
        this.error = 'Invalid response format from API.';
        this.loading = false;
        return;
      }

      this.assignments = data;

      if (this.assignments.length > 0) {
        const nurse = this.assignments[0].nurse;
        this.nurseName = nurse.name || nurse.fullName || 'Unnamed Nurse';

        const reasons = this.assignments.map(a => a.admission.reasonForAdmission);
        const rooms = this.assignments.map(a => a.admission.roomNumber);

        this.mostCommonReason = this.findMostCommon(reasons);
        this.mostUsedRoom = this.findMostCommon(rooms);
      }

      this.loading = false;
    },
    error: () => {
      this.error = 'Failed to load nurse data.';
      this.loading = false;
    }
  });
}


  private findMostCommon(arr: string[]): string {
    if (!arr.length) return '—';
    const freq: Record<string, number> = {};
    arr.forEach(item => (freq[item] = (freq[item] || 0) + 1));
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateThemeClass();
  }

  private updateThemeClass() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  loadNurseImage() {
    this.nurseImageService.getNurseImage(this.nurseId).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.onload = () => (this.nurseImageUrl = reader.result as string);
        reader.readAsDataURL(blob);
      },
      error: () => {
        this.nurseImageUrl = 'assets/default-avatar.png';
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;

    this.nurseImageService.uploadNurseImage(this.nurseId, this.selectedFile).subscribe({
      next: () => {
        alert('✅ Profile image updated successfully!');
        this.loadNurseImage();
      },
      error: () => {
        alert('❌ Failed to update profile image.');
      }
    });
  }
}
