using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Repository.Data.Migrations
{
    /// <inheritdoc />
    public partial class IntaialMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Dr_Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dr_NameAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dr_NameEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dr_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dr_Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Doctors", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Faculty",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fac_Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fac_Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faculty", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Instructors",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ins_Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ins_NameAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ins_NameEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Instructors", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Room_Num = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SensorData",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SensorData", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "FacultyYear",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Fac_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacultyYear", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FacultyYear_Faculty_Fac_ID",
                        column: x => x.Fac_ID,
                        principalTable: "Faculty",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "FacultyYearSemister",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sem_Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sem_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FacYear_Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FacultyYearSemister", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FacultyYearSemister_FacultyYear_FacYear_Id",
                        column: x => x.FacYear_Id,
                        principalTable: "FacultyYear",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    St_Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    St_NameAr = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    St_NameEn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    St_Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    St_Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FingerID = table.Column<int>(type: "int", nullable: true),
                    Fac_ID = table.Column<int>(type: "int", nullable: false),
                    FacYearSem_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Students_FacultyYearSemister_FacYearSem_ID",
                        column: x => x.FacYearSem_ID,
                        principalTable: "FacultyYearSemister",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Students_Faculty_Fac_ID",
                        column: x => x.Fac_ID,
                        principalTable: "Faculty",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Subjects",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sub_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dr_ID = table.Column<int>(type: "int", nullable: false),
                    Ins_ID = table.Column<int>(type: "int", nullable: false),
                    FacYearSem_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subjects", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Subjects_Doctors_Dr_ID",
                        column: x => x.Dr_ID,
                        principalTable: "Doctors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Subjects_FacultyYearSemister_FacYearSem_ID",
                        column: x => x.FacYearSem_ID,
                        principalTable: "FacultyYearSemister",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Subjects_Instructors_Ins_ID",
                        column: x => x.Ins_ID,
                        principalTable: "Instructors",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Lecture",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lecture_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sub_ID = table.Column<int>(type: "int", nullable: false),
                    LectureDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Degree = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecture", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Lecture_Subjects_Sub_ID",
                        column: x => x.Sub_ID,
                        principalTable: "Subjects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Studets_Rooms_Subject",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    St_ID = table.Column<int>(type: "int", nullable: false),
                    Sub_ID = table.Column<int>(type: "int", nullable: false),
                    Room_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Studets_Rooms_Subject", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Studets_Rooms_Subject_Rooms_Room_ID",
                        column: x => x.Room_ID,
                        principalTable: "Rooms",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Studets_Rooms_Subject_Students_St_ID",
                        column: x => x.St_ID,
                        principalTable: "Students",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Studets_Rooms_Subject_Subjects_Sub_ID",
                        column: x => x.Sub_ID,
                        principalTable: "Subjects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Attendance",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LectureID = table.Column<int>(type: "int", nullable: false),
                    St_ID = table.Column<int>(type: "int", nullable: false),
                    Atten = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendance", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Attendance_Lecture_LectureID",
                        column: x => x.LectureID,
                        principalTable: "Lecture",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attendance_LectureID",
                table: "Attendance",
                column: "LectureID");

            migrationBuilder.CreateIndex(
                name: "IX_FacultyYear_Fac_ID",
                table: "FacultyYear",
                column: "Fac_ID");

            migrationBuilder.CreateIndex(
                name: "IX_FacultyYearSemister_FacYear_Id",
                table: "FacultyYearSemister",
                column: "FacYear_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Lecture_Sub_ID",
                table: "Lecture",
                column: "Sub_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Students_Fac_ID",
                table: "Students",
                column: "Fac_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Students_FacYearSem_ID",
                table: "Students",
                column: "FacYearSem_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Studets_Rooms_Subject_Room_ID",
                table: "Studets_Rooms_Subject",
                column: "Room_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Studets_Rooms_Subject_St_ID",
                table: "Studets_Rooms_Subject",
                column: "St_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Studets_Rooms_Subject_Sub_ID",
                table: "Studets_Rooms_Subject",
                column: "Sub_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_Dr_ID",
                table: "Subjects",
                column: "Dr_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_FacYearSem_ID",
                table: "Subjects",
                column: "FacYearSem_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Subjects_Ins_ID",
                table: "Subjects",
                column: "Ins_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attendance");

            migrationBuilder.DropTable(
                name: "SensorData");

            migrationBuilder.DropTable(
                name: "Studets_Rooms_Subject");

            migrationBuilder.DropTable(
                name: "Lecture");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Subjects");

            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropTable(
                name: "FacultyYearSemister");

            migrationBuilder.DropTable(
                name: "Instructors");

            migrationBuilder.DropTable(
                name: "FacultyYear");

            migrationBuilder.DropTable(
                name: "Faculty");
        }
    }
}
