-- إدخال بيانات في جدول Faculty
INSERT INTO Faculty 
VALUES 
    ('CS', 'Computer Science'),
    ('ENG', 'Engineering');

-- إدخال بيانات في جدول FacultyYear
INSERT INTO FacultyYear  
VALUES
    ('2025',1),
    ('2026',1),
    ('2027',1),
    ('2028',1);

-- إدخال بيانات في جدول FacultyYearSemister
INSERT INTO FacultyYearSemister
VALUES 
    ('S1', 'Semester 1', 1),
    ('S2', 'Semester 2', 1),
	('S1', 'Semester 1', 2),
    ('S2', 'Semester 2', 2),
	('S1', 'Semester 1', 3),
    ('S2', 'Semester 2', 3),
	('S1', 'Semester 1', 4),
    ('S2', 'Semester 2', 4);

-- إدخال بيانات في جدول Students
 INSERT INTO Students  
VALUES 
    ('S001', N'أحمد علي', 'Ahmed Ali', 'Ahmed_Ali.com', 'image1.jpg', '0123456789', NULL, 1, 1),
    ('S002', N'سارة محمد', 'Sara Mohamed', 'Sara_Mohamed.com', 'image2.jpg', '0987654321', NULL, 1, 1),
    ('S003', N'محمد سمير', 'Mohamed Samir', 'Mohamed_Samir.com', 'image3.jpg', '0111222333', NULL, 1, 1),
    ('S004', N'ليلى حسن', 'Laila Hassan', 'Laila_Hassan.com', 'image4.jpg', '0223344556', NULL, 1, 1),
    ('S005', N'كريم يوسف', 'Karim Youssef', 'Karim_Youssef.com', 'image5.jpg', '0334455667', NULL, 1, 1),
    ('S006', N'هدى عبد الله', 'Huda Abdullah', 'Huda_Abdullah.com', 'image6.jpg', '0445566778', NULL, 1, 1),
    ('S007', N'مازن إبراهيم', 'Mazen Ibrahim', 'Mazen_Ibrahim.com', 'image7.jpg', '0556677889', NULL, 1, 1),
    ('S008', N'ياسمين صلاح', 'Yasmin Salah', 'Yasmin_Salah.com', 'image8.jpg', '0667788990', NULL, 1, 1),
    ('S009', N'نور الدين محمود', 'Nour El Din Mahmoud', 'Nour_Mahmoud.com', 'image9.jpg', '0778899001', NULL, 1, 1),
    ('S010', N'رنا خالد', 'Rana Khaled', 'Rana_Khaled.com', 'image10.jpg', '0889900112', NULL, 1, 1);


-- إدخال بيانات في جدول Doctors
INSERT INTO Doctors  
VALUES
    ('D001', N'د. محمد يوسف', 'Dr. Mohamed Youssef', 'myoussef', 'pass123', '01123456789'),
    ('D002', N'د. ندى مصطفى', 'Dr. Nada Mostafa', 'nmostafa', 'pass456', '01098765432'),
    ('D003', N'د. سامي إبراهيم', 'Dr. Sami Ibrahim', 'sibrahim', 'pass789', '01234567890'),
    ('D004', N'د. هالة فوزي', 'Dr. Hala Fawzy', 'hfawzy', 'pass321', '01987654321'),
    ('D005', N'د. عمرو زكريا', 'Dr. Amr Zakaria', 'azakaria', 'pass654', '01876543210'),
    ('D006', N'د. ريم نبيل', 'Dr. Reem Nabil', 'rnabil', 'pass111', '01011223344'),
    ('D007', N'د. كريم عبد الله', 'Dr. Karim Abdallah', 'kabdallah', 'pass222', '01022334455'),
    ('D008', N'د. ياسمين حسين', 'Dr. Yasmin Hussein', 'yhussein', 'pass333', '01033445566'),
    ('D009', N'د. حسام كمال', 'Dr. Hossam Kamal', 'hkamal', 'pass444', '01044556677'),
    ('D010', N'د. نجلاء عادل', 'Dr. Naglaa Adel', 'nadel', 'pass555', '01055667788');


-- إدخال بيانات في جدول Instructors
INSERT INTO Instructors (Ins_Code, Ins_NameAr, Ins_NameEn, Phone)
VALUES
    ('I001', N'أستاذ أحمد سعيد', 'Prof. Ahmed Said', '0123456789'),
    ('I002', N'أستاذة مريم عادل', 'Prof. Mariam Adel', '01122334455');

-- إدخال بيانات في جدول Rooms
INSERT INTO Rooms (Room_Num)
VALUES
    ('C42'),
    ('C37');

-- إدخال بيانات في جدول Subjects
INSERT INTO Subjects (Sub_Name, Dr_ID, Ins_ID, FacYearSem_ID)
VALUES
    (N'برمجة الحاسوب', 1, 1, 1),
    (N'الهندسة المدنية', 2, 2, 1),
    (N'الرياضيات المتقدمة', 3, 1, 1),
    (N'الذكاء الاصطناعي', 1, 1, 1),
    (N'الشبكات', 4, 2, 1),
    (N'تحليل النظم', 2, 1, 2),
    (N'قواعد البيانات', 5, 1, 2),
    (N'الفيزياء العامة', 6, 2, 2),
    (N'هندسة البرمجيات', 7, 1, 2),
    (N'أمن المعلومات', 8, 2, 2);

-- إدخال بيانات في جدول Lecture_S
INSERT INTO Lecture 
VALUES
    ('L001', 1,'2025-05-10', 50),
    ('L001', 2,'2025-05-10', 50),
    ('L001', 3,'2025-05-11', 50),
    ('L001',4 ,'2025-05-11', 50),
    ('L001', 5,'2025-05-11', 50),
    ('L001', 6,'2025-05-12', 50),
    ('L001', 10,'2025-05-12', 50),
    ('L001', 11,'2025-05-12', 50);

-- إدخال بيانات في جدول Attendance_T
INSERT INTO Attendance  
VALUES
    (5, 2, 1),  -- حضر أحمد علي في المحاضرة L001
    (4, 2, 0);  -- غابت سارة محمد في المحاضرة L002
