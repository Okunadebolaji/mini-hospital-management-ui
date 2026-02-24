import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-upload',
  templateUrl: './doctor-upload.html',
  styleUrls: ['./doctor-upload.css']
})
export class DoctorUploadComponent {
  selectedFile?: File;
  doctorId!: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.doctorId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile || !this.doctorId) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`https://localhost:7243/api/Doctor/${this.doctorId}/profile-image`, formData)
      .subscribe({
        next: () => alert('Profile image uploaded successfully!'),
        error: () => alert('Upload failed.')
      });
  }
}
