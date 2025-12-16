<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Certificate of Completion</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'DejaVu Sans', sans-serif;
            width: 297mm;
            height: 210mm;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .certificate-container {
            width: 250mm;
            height: 160mm;
            margin: 10mm auto;
            background: white;
            border: 8px solid #667eea;
            border-radius: 8px;
            padding: 15px 35px;
            text-align: center;
            position: relative;
        }
        
        .certificate-header {
            margin-bottom: 90px;
        }
        
        .certificate-title {
            font-size: 34px;
            font-weight: bold;
            color: #667eea;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin-bottom: 2px;
        }
        
        .certificate-subtitle {
            font-size: 14px;
            color: #666;
            font-style: italic;
        }
        
        .certificate-body {
            margin: 15px 0;
        }
        
        .awarded-text {
            font-size: 13px;
            color: #444;
            margin-bottom: 10px;
        }
        
        .student-name {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin: 10px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .course-completion-text {
            font-size: 13px;
            color: #444;
            margin: 10px 0;
        }
        
        .course-title {
            font-size: 22px;
            font-weight: bold;
            color: #667eea;
            margin: 10px 0 35px 0;
        }
        
        .certificate-footer {
            margin-top: 100px;
            display: table;
            width: 100%;
        }
        
        .signature-section {
            display: table-cell;
            text-align: left;
            width: 50%;
            vertical-align: bottom;
        }
        
        .signature-line {
            border-top: 2px solid #333;
            width: 180px;
            margin-bottom: 5px;
            padding-top: 3px;
        }
        
        .signature-label {
            font-size: 11px;
            color: #666;
        }
        
        .date-section {
            display: table-cell;
            text-align: right;
            width: 50%;
            vertical-align: bottom;
        }
        
        .certificate-date {
            font-size: 13px;
            color: #666;
        }
        
        .certificate-id {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 9px;
            color: #999;
        }
        
        .decorative-element {
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #667eea, transparent);
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="certificate-header">
            <div class="certificate-title">Certificate</div>
            <div class="certificate-subtitle">of Completion</div>
        </div>
        
        <div class="decorative-element"></div>
        
        <div class="certificate-body">
            <div class="awarded-text">This certificate is proudly presented to</div>
            
            <div class="student-name">{{ $user->name }}</div>
            
            <div class="course-completion-text">
                for successfully completing the course
            </div>
            
            <div class="course-title">{{ $course->title }}</div>
        </div>
        
        <div class="decorative-element"></div>
        
        <div class="certificate-footer">
            <div class="signature-section">
                <div class="signature-line">
                    <strong>Intan Nurul</strong>
                </div>
                <div class="signature-label">CEO DevCourse</div>
            </div>
            
            <div class="date-section">
                <div class="certificate-date">
                    <strong>Date:</strong> {{ \Carbon\Carbon::parse($certificate->issued_at)->format('F d, Y') }}
                </div>
            </div>
        </div>
        
        <div class="certificate-id">
            Certificate ID: {{ strtoupper(substr(md5($certificate->id . $user->id . $course->id), 0, 12)) }}
        </div>
    </div>
</body>
</html>
