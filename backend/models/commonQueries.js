export const actionToGetAllSubjectDataListQuery = ()=>{
    return `SELECT id,name from subject`;
}
export const actionToGetAllStudentDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile left join  school_board on student_profile.school_board = school_board.id `;
}
export const actionToGetAllNewStudentProfileDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile left join  school_board on student_profile.school_board = school_board.id `;
}
export const actionToGetTodayProfileDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile left join  school_board on student_profile.school_board = school_board.id  where (date(student_profile.created_at)=CURDATE()) `;
}
export const actionToGetLatestStudentProfileDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile left join  school_board on student_profile.school_board = school_board.id order by student_profile.created_at desc limit 5`;
}
export const actionToGetAllStudentSubscriptionDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile join school_board on student_profile.school_board=school_board.id where subscription_end_date is not NULL order by student_profile.created_at desc`;
}
export const actionToGetLatestSubscriptionDataListQuery = ()=>{
    return `select student_profile.*,school_board.name as school_board_name from student_profile join school_board on student_profile.school_board=school_board.id where subscription_end_date is not NULL order by student_profile.created_at desc limit 5`;
}
export const actionToGetAllTeacherDataListQuery = ()=>{
    return `select app_user.*,school_board.name as school_board_name from app_user left join school_board on app_user.board=school_board.id where app_user.role=2 order by  app_user.created_at desc`;
}
export const actionToSearchTeacherAccordingToTheConditionQuery = (subject_id,student_class,school_board)=>{
    return `SELECT app_user.name AS teacher_name,app_user.id AS teacher_id
            FROM teacher_subject_and_class
                     INNER JOIN app_user ON app_user.id = teacher_subject_and_class.teacher_id
            WHERE  app_user.role = 2 AND app_user.board = '${school_board}' AND
                teacher_subject_and_class.teacher_class = ${student_class} AND teacher_subject_and_class.subject_id = '${subject_id}'
            GROUP BY app_user.id
    `;
}
export const actionToAlreadyCreatedClassAccordingToTheConditionQuery = (weekStartDate,weekEndDate,subject_id,student_class,school_board,batch)=>{
    return `select class_assigned_teacher_batch.batch AS batch,
                   app_user.name AS teacher_name,
                   class_assigned_teacher_batch.id AS id,
                   class_assigned_teacher_batch.class_batch_name AS class_batch_name,
                   profile_subject_with_batch.count_data AS class_count,
                   class_timetable_with_class_batch_assigned.jsdata as class_timetable_with_class_batch_assigned

            from class_assigned_teacher_batch
                     inner join (SELECT class_assigned_teacher_batch_id,
                                        JSON_ARRAYAGG(
                                                json_object(
                                                        'start_from_date_time',
                                                        class_timetable_with_class_batch_assigned.start_from_date_time,
                                                        'id', class_timetable_with_class_batch_assigned.id,
                                                        'class_end_date_time',
                                                        class_timetable_with_class_batch_assigned.class_end_date_time
                                                    ) order by class_timetable_with_class_batch_assigned.start_from_date_time
                                            ) jsdata
                                 FROM class_timetable_with_class_batch_assigned
                                 GROUP BY class_assigned_teacher_batch_id) class_timetable_with_class_batch_assigned
                                on class_assigned_teacher_batch.id = class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id


                     inner join (SELECT profile_subject_with_batch.class_assigned_teacher_batch_id,COUNT(class_assigned_teacher_batch_id) as count_data
                                 FROM profile_subject_with_batch
                                 GROUP BY profile_subject_with_batch.class_assigned_teacher_batch_id) profile_subject_with_batch
                                on profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id

                     join school_board on class_assigned_teacher_batch.school_board = school_board.id
                     join subject on subject.id = class_assigned_teacher_batch.subject_id
                     INNER JOIN app_user ON app_user.id = class_assigned_teacher_batch.teacher_id
        AND class_assigned_teacher_batch.school_board = '${school_board}' 
        AND  class_assigned_teacher_batch.student_class = '${student_class}' AND class_assigned_teacher_batch.subject_id = '${subject_id}'
        AND class_assigned_teacher_batch.batch != 1
        AND class_assigned_teacher_batch.batch = ${batch}`;

    // SELECT app_user.name AS teacher_name,
    //     COUNT(profile_subject_with_batch.id) AS class_count,
    //     class_assigned_teacher_batch.starting_from_date AS starting_from_date,
    //     class_assigned_teacher_batch.batch AS batch
    //
    // FROM class_assigned_teacher_batch
    // INNER JOIN app_user ON app_user.id = class_assigned_teacher_batch.teacher_id
    // INNER JOIN profile_subject_with_batch ON class_assigned_teacher_batch.id = profile_subject_with_batch.class_assigned_teacher_batch_id
    // WHERE  class_assigned_teacher_batch.school_board = '${school_board}' AND
    // class_assigned_teacher_batch.student_class = '${student_class}' AND class_assigned_teacher_batch.subject_id = '${subject_id}'
    // AND class_assigned_teacher_batch.batch != 1
    // AND class_assigned_teacher_batch.batch = ${batch}
    //     GROUP BY class_assigned_teacher_batch.id
}
export const actionToGetLatestTeacherDataListQuery = ()=>{
    return `select app_user.*,school_board.name as school_board_name from app_user join school_board on app_user.board=school_board.id where app_user.role=2 order by created_at desc limit 5`;
}
export const actionToGetAllClassesDataListQuery = (weekStartDate,weekEndDate)=>{
    return `select profile_subject_with_batch.id                              as profile_subject_with_batch_id,
                   profile_subject_with_batch.batch                           as profile_subject_with_batch_batch_type,
                   profile_subject_with_batch.has_taken_demo                  as profile_subject_with_batch_has_taken_demo,
                   profile_subject_with_batch.class_assigned_teacher_batch_id as class_assigned_teacher_batch_id,
                   class_assigned_teacher_batch.is_demo_class                 as is_demo_class,
                   class_assigned_teacher_batch.class_batch_name              as class_batch_name,
                   student_profile.id                                         as student_id,
                   student_profile.name                                       as student_name,
                   student_profile.email                                      as student_email,
                   subject.id                                                 as subject_id,
                   subject.name                                               as subject_name,
                   school_board.name                                          as school_board_name,
                   school_board.id                                            as school_board_id,
                   class_timetable_with_class_batch_assigned.jsdata           as class_timetable_with_class_batch_assigned,
                   student_profile.student_class                              as student_class

            from profile_subject_with_batch
                     join student_profile on profile_subject_with_batch.profile_id = student_profile.id
                     join class_assigned_teacher_batch on profile_subject_with_batch.class_assigned_teacher_batch_id =
                                                          class_assigned_teacher_batch.id
                     left join (SELECT class_assigned_teacher_batch_id,
                                       JSON_ARRAYAGG(
                                               json_object(
                                                       'start_from_date_time',
                                                       class_timetable_with_class_batch_assigned.start_from_date_time,
                                                       'id', class_timetable_with_class_batch_assigned.id,
                                                       'class_end_date_time',
                                                       class_timetable_with_class_batch_assigned.class_end_date_time
                                                   )
                                           ) jsdata
                                FROM class_timetable_with_class_batch_assigned
                                WHERE DATE (start_from_date_time) >= '${weekStartDate}' AND DATE(start_from_date_time) <= '${weekEndDate}'
                                GROUP BY class_assigned_teacher_batch_id) class_timetable_with_class_batch_assigned
                               on class_assigned_teacher_batch.id =
                                  class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id

                     join school_board on student_profile.school_board = school_board.id
                     join subject on subject.id = profile_subject_with_batch.subject_id
            WHERE profile_subject_with_batch.has_taken_demo = 1`;
}
export const actionToGetAllShoolBoardDataListQuery = ()=>{
    return `SELECT id,name from school_board`;
}
export const actionToGetAllDemoClassesDetailsQuery = ()=>{
    return `select profile_subject_with_batch.id as  profile_subject_with_batch_id,
                   profile_subject_with_batch.batch as  profile_subject_with_batch_batch_type,
                   profile_subject_with_batch.has_taken_demo as  profile_subject_with_batch_has_taken_demo,
                   profile_subject_with_batch.class_assigned_teacher_batch_id as  class_assigned_teacher_batch_id,
                   student_profile.id as student_id,
                   student_profile.name as student_name,
                   student_profile.email as student_email,
                   subject.id as subject_id,
                   subject.name as subject_name,
                   school_board.name as school_board_name,
                   school_board.id as school_board_id,
                   student_profile.student_class as student_class

     from profile_subject_with_batch
     join student_profile on profile_subject_with_batch.profile_id =student_profile.id
     join school_board on student_profile.school_board=school_board.id
     join subject on subject.id=profile_subject_with_batch.subject_id 
WHERE profile_subject_with_batch.has_taken_demo = 0`;
}
export const actionToGetAllRecordedClassesDetailsQuery = ()=>{
    return `SELECT
                class_call_recording.name AS recorded_video_title,
                class_call_recording.created_at AS class_recorded_at,
                class_call_recording.id AS class_call_recording_id,
                class_assigned_teacher_batch.batch AS classes_assigned_to_teacher_batch,
                class_assigned_teacher_batch.is_demo_class AS is_demo_class,
                class_assigned_teacher_batch.student_class AS student_class,
                school_board.name AS school_board_name,
                subject.name AS subject_name,
                app_user.name AS teacher_name,
                app_user.email AS teacher_email
            FROM
                class_call_recording
                    JOIN
                class_assigned_teacher_batch ON class_call_recording.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                    JOIN
                school_board ON school_board.id = class_assigned_teacher_batch.school_board
                    JOIN
                subject ON subject.id = class_assigned_teacher_batch.subject_id
                    JOIN
                app_user ON app_user.id = class_assigned_teacher_batch.teacher_id  order by class_call_recording.created_at desc `;
}

export const actionToGetLatestDemoClassesDetailsQuery = ()=>{
    return `select profile_subject_with_batch.id as  profile_subject_with_batch_id,
                   profile_subject_with_batch.batch as  profile_subject_with_batch_batch_type,
                   profile_subject_with_batch.has_taken_demo as  profile_subject_with_batch_has_taken_demo,
                   profile_subject_with_batch.class_assigned_teacher_batch_id as  class_assigned_teacher_batch_id,
                   student_profile.id as student_id,
                   student_profile.name as student_name,
                   student_profile.email as student_email,
                   subject.id as subject_id,
                   subject.name as subject_name,
                   school_board.name as school_board_name,
                   school_board.id as school_board_id,
                   student_profile.student_class as student_class

     from profile_subject_with_batch
     join student_profile on profile_subject_with_batch.profile_id =student_profile.id
     join school_board on student_profile.school_board=school_board.id
     join subject on subject.id=profile_subject_with_batch.subject_id 
WHERE profile_subject_with_batch.has_taken_demo = 0 order by profile_subject_with_batch.created_at limit 5`;
}
export const actionToGetAllAttendClassWithAssignmentQuery = (profileId)=>{
    return `SELECT JSON_OBJECT(
                           'class_assigned_teacher_batch', class_assigned_teacher_batch.jsdata,
                           'created_at', student_class_attend.created_at,
                           'id',student_class_attend.id,
                           'student_class_attend_assignment', student_class_attend_assignment.jsdata
                       ) AS class_attend
            from student_class_attend
                     LEFT JOIN (SELECT class_assigned_teacher_batch.id,
                                       json_object(
                                               'id', class_assigned_teacher_batch.id,
                                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                                               'starting_from_date', class_assigned_teacher_batch.starting_from_date,
                                               'batch', class_assigned_teacher_batch.batch,
                                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                                               'subject_id', class_assigned_teacher_batch.subject_id,
                                               'school_board', class_assigned_teacher_batch.school_board,
                                               'student_class', class_assigned_teacher_batch.student_class,
                                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                                               'teacher_name', app_user.name,
                                               'subject_name', subject.name
                                           ) jsdata
                                FROM class_assigned_teacher_batch
                                         LEFT JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                                         LEFT JOIN app_user ON class_assigned_teacher_batch.teacher_id = app_user.id
                                GROUP BY class_assigned_teacher_batch.id) class_assigned_teacher_batch
                               ON student_class_attend.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     LEFT JOIN (SELECT student_class_attend_assignment.student_class_attend_id,
                                       json_arrayagg(
                                               json_object(
                                                       'id', student_class_attend_assignment.id,
                                                       'path', student_class_attend_assignment.path,
                                                       'name', student_class_attend_assignment.name
                                                   )
                                           ) jsdata
                                FROM student_class_attend_assignment
                                GROUP BY student_class_attend_assignment.student_class_attend_id) student_class_attend_assignment
                               ON student_class_attend_assignment.student_class_attend_id = student_class_attend.id
            WHERE student_class_attend.student_profile_id = '${profileId}'
            ORDER BY student_class_attend.created_at`;
}
export const actionToGetAllStudentClassAttendWithAssignmentQuery = (teacherId)=>{
    return `SELECT json_object(
                           'class_assigned_teacher_batch', class_assigned_teacher_batch.jsdata,
                           'created_at', student_class_attend.created_at,
                           'id',student_class_attend.id,
                           'student_class_attend', student_class_attend.jsdata
                       ) AS classes_assigned
            FROM class_assigned_teacher_batch

                     INNER JOIN (
                SELECT student_class_attend.class_assigned_teacher_batch_id,
                       json_arrayagg(
                               json_object(
                                       'student_name', student_profile.name,
                                       'id', student_class_attend_assignment.id,
                                       'path', student_class_attend_assignment.path,
                                       'name', student_class_attend_assignment.name
                                   )
                           ) jsdata
                FROM student_class_attend
                         INNER JOIN student_profile ON student_profile_id = student_profile.id
                         INNER JOIN student_class_attend_assignment
                                    ON student_class_attend_assignment.student_class_attend_id = student_class_attend.id

                GROUP BY student_class_attend.class_assigned_teacher_batch_id
            ) student_class_attend
                                ON student_class_attend.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id

            WHERE class_assigned_teacher_batch.teacher_id ='${teacherId}'`;
}
export const actionToGetAllClassWithAssignmentQuery = (profileId)=>{
    return `SELECT JSON_OBJECT(
                           'class_assigned_teacher_batch', class_assigned_teacher_batch.jsdata,
                           'created_at', student_class_attend.created_at,
                           'id',student_class_attend.id,
                           'student_class_attend_assignment', student_class_attend_assignment.jsdata
                       ) AS class_attend
            from student_class_attend
                     LEFT JOIN (SELECT class_assigned_teacher_batch.id,
                                       json_object(
                                               'id', class_assigned_teacher_batch.id,
                                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                                               'starting_from_date', class_assigned_teacher_batch.starting_from_date,
                                               'batch', class_assigned_teacher_batch.batch,
                                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                                               'subject_id', class_assigned_teacher_batch.subject_id,
                                               'school_board', class_assigned_teacher_batch.school_board,
                                               'student_class', class_assigned_teacher_batch.student_class,
                                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                                               'teacher_name', app_user.name,
                                               'subject_name', subject.name
                                           ) jsdata
                                FROM class_assigned_teacher_batch
                                         LEFT JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                                         LEFT JOIN app_user ON class_assigned_teacher_batch.teacher_id = app_user.id
                                GROUP BY class_assigned_teacher_batch.id) class_assigned_teacher_batch
                               ON student_class_attend.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     LEFT JOIN (SELECT student_class_attend_assignment.student_class_attend_id,
                                       json_arrayagg(
                                               json_object(
                                                       'id', student_class_attend_assignment.id,
                                                       'path', student_class_attend_assignment.path,
                                                       'name', student_class_attend_assignment.name
                                                   )
                                           ) jsdata
                                FROM student_class_attend_assignment
                                GROUP BY student_class_attend_assignment.student_class_attend_id) student_class_attend_assignment
                               ON student_class_attend_assignment.student_class_attend_id = student_class_attend.id
            WHERE student_class_attend.student_profile_id = '${profileId}'
            ORDER BY student_class_attend.created_at`;
}

export const actionToGetUserAllClassesQuery = (userId)=>{
    return `SELECT json_object('id',student_profile.id,
                               'father_name',student_profile.father_name,
                               'mother_name',student_profile.mother_name, 
                               'name',student_profile.name,
                               'school_name',student_profile.school_name,
                               'school_board',student_profile.school_board,
                               'state',student_profile.state,
                               'batch',student_profile.batch,
                               'city',student_profile.city,
                               'taken_single_demo',student_profile.taken_single_demo,
                               'subscription_end_date',student_profile.subscription_end_date,
                               'school_board',school_board.name,
                               'school_board_id',school_board.id,
                               'student_class',student_profile.student_class,
                               'email',student_profile.email,
                               'profile_subject_with_batch',profile_subject_with_batch.jsdata
                       ) AS profile_data from student_profile
                                                  INNER JOIN school_board ON student_profile.school_board = school_board.id
                                                  INNER JOIN (SELECT profile_subject_with_batch.profile_id, 
                                                                    json_arrayagg( 
                                                                            json_object(
                                                                                    'id',profile_subject_with_batch.id,
                                                                                    'student_id',profile_subject_with_batch.profile_id,
                                                                                    'subject_id',profile_subject_with_batch.subject_id,
                                                                                    'has_taken_demo',profile_subject_with_batch.has_taken_demo,
                                                                                    'class_assigned_teacher_batch_id',profile_subject_with_batch.class_assigned_teacher_batch_id,
                                                                                    'batch',profile_subject_with_batch.batch,
                                                                                    'class_assigned_teacher_batch',class_assigned_teacher_batch.jsdata,
                                                                                    'subject_name',subject.name
                                                                                )
                                                                        ) jsdata
                                                             FROM profile_subject_with_batch
                                                                      INNER JOIN subject ON profile_subject_with_batch.subject_id = subject.id
                                                                      LEFT JOIN (SELECT class_assigned_teacher_batch.id,
                                                                                        json_object(
                                                                                                'id',class_assigned_teacher_batch.id,
                                                                                                'teacher_id',class_assigned_teacher_batch.teacher_id,
                                                                                                'class_end_time',class_assigned_teacher_batch.class_end_time,
                                                                                                'teacher_name',app_user.name,
                                                                                                'starting_from_date',class_assigned_teacher_batch.starting_from_date,
                                                                                                'is_demo_class',class_assigned_teacher_batch.is_demo_class
                                                                                            ) jsdata
                                                                                 FROM class_assigned_teacher_batch
                                                                                 LEFT JOIN app_user ON class_assigned_teacher_batch.teacher_id = app_user.id
                                                                          ) class_assigned_teacher_batch ON class_assigned_teacher_batch.id = profile_subject_with_batch.class_assigned_teacher_batch_id
                                                  
                                                             GROUP BY profile_subject_with_batch.profile_id) profile_subject_with_batch ON profile_subject_with_batch.profile_id = student_profile.id
                                                  WHERE student_profile.created_by = '${userId}'`;
}
export const actionToGetStudentAllTodayClassesQuery = (userId,todayDate)=>{
    return `SELECT JSON_OBJECT('class_id', class_timetable_with_class_batch_assigned.id,
                               'id',class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'profile_subject_with_batch_id', profile_subject_with_batch.id,
                               'start_from_date_time', class_timetable_with_class_batch_assigned.start_from_date_time,
                               'class_end_date_time', class_timetable_with_class_batch_assigned.class_end_date_time,
                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                               'subject_name', subject.name,
                               'teacher_name', app_user.name,
                               'student_class', class_assigned_teacher_batch.student_class,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS classes_data
            from class_timetable_with_class_batch_assigned
                     INNER JOIN class_assigned_teacher_batch on class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                     LEFT JOIN app_user ON class_assigned_teacher_batch.teacher_id = app_user.id
                     INNER JOIN  profile_subject_with_batch ON profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN  student_profile ON student_profile.id = profile_subject_with_batch.profile_id
            WHERE student_profile.created_by = '${userId}'
              AND (DATE(class_timetable_with_class_batch_assigned.start_from_date_time) = '${todayDate}')`;
}
export const actionToGetStudentAllDemoClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('id', class_assigned_teacher_batch.id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'profile_subject_with_batch_id', profile_subject_with_batch.id,
                               'starting_from_date', class_assigned_teacher_batch.starting_from_date,
                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                               'subject_name', subject.name,
                               'teacher_name', app_user.name,
                               'student_class', class_assigned_teacher_batch.student_class,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS classes_data
            from class_assigned_teacher_batch
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                     LEFT JOIN app_user ON class_assigned_teacher_batch.teacher_id = app_user.id
                     INNER JOIN profile_subject_with_batch ON profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN  student_profile ON student_profile.id = profile_subject_with_batch.profile_id
            WHERE student_profile.created_by = '${userId}'
              AND class_assigned_teacher_batch.is_demo_class = 1 AND profile_subject_with_batch.has_taken_demo = 0`;
}

export const actionToGetTeacherAllTodayClassesQuery = (userId,todayDate)=>{
    return `SELECT JSON_OBJECT('id',class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id,
                               'class_id', class_timetable_with_class_batch_assigned.id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'start_from_date_time', class_timetable_with_class_batch_assigned.start_from_date_time,
                               'class_end_date_time', class_timetable_with_class_batch_assigned.class_end_date_time,
                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                               'profile_subject_with_batch', profile_subject_with_batch.jsdata,
                               'subject_name', subject.name,
                               'student_class', class_assigned_teacher_batch.student_class,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS teacher_classes_data
            from class_timetable_with_class_batch_assigned
                     INNER JOIN class_assigned_teacher_batch on class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                     INNER JOIN (SELECT profile_subject_with_batch.class_assigned_teacher_batch_id,
                                        json_arrayagg(
                                                json_object(
                                                        'id', profile_subject_with_batch.id,
                                                        'student_name', student_profile.name,
                                                        'student_id', student_profile.id
                                                    )
                                            ) jsdata
                                 FROM profile_subject_with_batch
                                          INNER JOIN student_profile ON profile_subject_with_batch.profile_id = student_profile.id
                                 GROUP BY profile_subject_with_batch.class_assigned_teacher_batch_id) profile_subject_with_batch
                                ON profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
            WHERE class_assigned_teacher_batch.teacher_id = '${userId}'
              AND (DATE(class_timetable_with_class_batch_assigned.start_from_date_time) = '${todayDate}')`;
}

export const actionToGetTeacherAllDemoClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('id', class_assigned_teacher_batch.id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'starting_from_date', class_assigned_teacher_batch.starting_from_date,
                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                               'profile_subject_with_batch', profile_subject_with_batch.jsdata,
                               'subject_name', subject.name,
                               'student_class', class_assigned_teacher_batch.student_class,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS teacher_classes_data
            from class_assigned_teacher_batch
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                     INNER JOIN (SELECT profile_subject_with_batch.class_assigned_teacher_batch_id,
                                        json_arrayagg(
                                                json_object(
                                                        'id', profile_subject_with_batch.id,
                                                        'student_name', student_profile.name,
                                                        'student_id', student_profile.id
                                                    )
                                            ) jsdata
                                 FROM profile_subject_with_batch
                                          INNER JOIN student_profile ON profile_subject_with_batch.profile_id = student_profile.id
                                 GROUP BY profile_subject_with_batch.class_assigned_teacher_batch_id) profile_subject_with_batch
                                ON profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
            WHERE class_assigned_teacher_batch.teacher_id = '${userId}'
              AND class_assigned_teacher_batch.is_demo_class = 1 AND class_assigned_teacher_batch.class_end_time IS NULL`;
}
export const actionToGetTeacherAllClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('id', class_assigned_teacher_batch.id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'starting_from_date', class_assigned_teacher_batch.starting_from_date,
                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                               'class_batch_name', class_assigned_teacher_batch.class_batch_name,
                               'subject_name', subject.name,
                               'student_class', class_assigned_teacher_batch.student_class,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS teacher_classes_data
            from class_assigned_teacher_batch
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
            WHERE class_assigned_teacher_batch.teacher_id = '${userId}' AND class_assigned_teacher_batch.is_demo_class = 0`;
}
export const actionToGetAllClassAssignmentDataWithClassAttendQuery = (userId,weekStartDate,weekEndDate)=>{
    return `SELECT JSON_OBJECT('id',class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id,
                               'class_id', class_timetable_with_class_batch_assigned.id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'start_from_date_time', class_timetable_with_class_batch_assigned.start_from_date_time,
                               'class_end_date_time', class_timetable_with_class_batch_assigned.class_end_date_time,
                               'profile_subject_with_batch', profile_subject_with_batch.jsdata,
                               'student_class_attend', student_class_attend.jsdata,
                               'class_batch_name', class_assigned_teacher_batch.class_batch_name,
                               'teacher_class_attend_assignment', teacher_class_attend_assignment.jsdata,
                               'subject_name', subject.name,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS teacher_classes_data
            from class_timetable_with_class_batch_assigned
                     INNER JOIN class_assigned_teacher_batch on class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id

                     INNER JOIN (SELECT student_class_attend.class_timetable_with_class_batch_assigned_id,
                                        json_arrayagg(
                                                json_object(
                                                        'id', student_class_attend.id,
                                                        'profile_subject_with_batch_id', student_class_attend.profile_subject_with_batch_id,
                                                        'student_class_attend_assignment',student_class_attend_assignment.jsdata,
                                                        'student_name', student_profile.name
                                                    )
                                            ) jsdata
                                 FROM student_class_attend
                                          INNER JOIN student_profile ON student_class_attend.student_profile_id = student_profile.id
                                          left JOIN (SELECT student_class_attend_assignment.student_class_attend_id,
                                                            json_arrayagg(
                                                                    json_object(
                                                                            'id', student_class_attend_assignment.id,
                                                                            'path', student_class_attend_assignment.path,
                                                                            'name', student_class_attend_assignment.name,
                                                                            'created_at', student_class_attend_assignment.created_at
                                                                        )
                                                                ) jsdata
                                                     FROM student_class_attend_assignment
                                                     GROUP BY student_class_attend_assignment.student_class_attend_id) student_class_attend_assignment
                                                    ON student_class_attend_assignment.student_class_attend_id = student_class_attend.id

                                 GROUP BY student_class_attend.class_timetable_with_class_batch_assigned_id) student_class_attend
                                ON student_class_attend.class_timetable_with_class_batch_assigned_id = class_timetable_with_class_batch_assigned.id

                     left JOIN (SELECT teacher_class_attend_assignment.class_timetable_with_class_batch_assigned_id,
                                       json_arrayagg(
                                               json_object(
                                                       'id', teacher_class_attend_assignment.id,
                                                       'path', teacher_class_attend_assignment.path,
                                                       'name', teacher_class_attend_assignment.name,
                                                       'created_at', teacher_class_attend_assignment.created_at
                                                   )
                                           ) jsdata
                                FROM teacher_class_attend_assignment

                                GROUP BY teacher_class_attend_assignment.class_timetable_with_class_batch_assigned_id) teacher_class_attend_assignment
                               ON teacher_class_attend_assignment.class_timetable_with_class_batch_assigned_id = class_timetable_with_class_batch_assigned.id

                     INNER JOIN (SELECT profile_subject_with_batch.class_assigned_teacher_batch_id,
                                        json_arrayagg(
                                                json_object(
                                                        'id', profile_subject_with_batch.id,
                                                        'student_name', student_profile.name,
                                                        'student_class', student_profile.student_class,
                                                        'student_id', student_profile.id,
                                                        'attend_class_count',(SELECT COUNT(student_class_attend.id) FROM student_class_attend WHERE student_class_attend.profile_subject_with_batch_id = profile_subject_with_batch.id)
                                                    )
                                            ) jsdata
                                 FROM profile_subject_with_batch

                                          INNER JOIN student_profile ON profile_subject_with_batch.profile_id = student_profile.id
                                 GROUP BY profile_subject_with_batch.class_assigned_teacher_batch_id) profile_subject_with_batch
                                ON profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
            WHERE class_assigned_teacher_batch.teacher_id = '${userId}'
              AND (DATE(class_timetable_with_class_batch_assigned.start_from_date_time) >= '${weekStartDate}' AND DATE(class_timetable_with_class_batch_assigned.start_from_date_time) <= '${weekEndDate}')`;
}
export const actionToGetStudentClassAssignmentDataWithClassAttendQuery = (userId,weekStartDate,weekEndDate)=>{
    return `SELECT JSON_OBJECT('id',class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id,
                               'class_id', class_timetable_with_class_batch_assigned.id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'start_from_date_time', class_timetable_with_class_batch_assigned.start_from_date_time,
                               'class_end_date_time', class_timetable_with_class_batch_assigned.class_end_date_time,
                               'profile_subject_with_batch', profile_subject_with_batch.jsdata,
                               'student_class_attend', student_class_attend.jsdata,
                               'class_batch_name', class_assigned_teacher_batch.class_batch_name,
                               'teacher_class_attend_assignment', teacher_class_attend_assignment.jsdata,
                               'subject_name', subject.name,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS teacher_classes_data
            from class_timetable_with_class_batch_assigned
                     INNER JOIN class_assigned_teacher_batch on class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id

                     INNER JOIN (SELECT student_class_attend.class_timetable_with_class_batch_assigned_id,
                                        json_arrayagg(
                                                json_object(
                                                        'id', student_class_attend.id,
                                                        'profile_subject_with_batch_id', student_class_attend.profile_subject_with_batch_id,
                                                        'student_class_attend_assignment',student_class_attend_assignment.jsdata,
                                                        'student_name', student_profile.name
                                                    )
                                            ) jsdata
                                 FROM student_class_attend
                                          INNER JOIN student_profile ON student_class_attend.student_profile_id = student_profile.id
                                          left JOIN (SELECT student_class_attend_assignment.student_class_attend_id,
                                                            json_arrayagg(
                                                                    json_object(
                                                                            'id', student_class_attend_assignment.id,
                                                                            'path', student_class_attend_assignment.path,
                                                                            'name', student_class_attend_assignment.name,
                                                                            'created_at', student_class_attend_assignment.created_at
                                                                        )
                                                                ) jsdata
                                                     FROM student_class_attend_assignment
                                                     GROUP BY student_class_attend_assignment.student_class_attend_id) student_class_attend_assignment
                                                    ON student_class_attend_assignment.student_class_attend_id = student_class_attend.id
                                 WHERE student_profile.created_by = '${userId}'
                                 GROUP BY student_class_attend.class_timetable_with_class_batch_assigned_id) student_class_attend
                                ON student_class_attend.class_timetable_with_class_batch_assigned_id = class_timetable_with_class_batch_assigned.id

                     left JOIN (SELECT teacher_class_attend_assignment.class_timetable_with_class_batch_assigned_id,
                                       json_arrayagg(
                                               json_object(
                                                       'id', teacher_class_attend_assignment.id,
                                                       'path', teacher_class_attend_assignment.path,
                                                       'name', teacher_class_attend_assignment.name,
                                                       'created_at', teacher_class_attend_assignment.created_at
                                                   )
                                           ) jsdata
                                FROM teacher_class_attend_assignment

                                GROUP BY teacher_class_attend_assignment.class_timetable_with_class_batch_assigned_id) teacher_class_attend_assignment
                               ON teacher_class_attend_assignment.class_timetable_with_class_batch_assigned_id = class_timetable_with_class_batch_assigned.id

                     INNER JOIN (SELECT profile_subject_with_batch.class_assigned_teacher_batch_id,
                                        json_arrayagg(
                                                json_object(
                                                        'id', profile_subject_with_batch.id,
                                                        'student_name', student_profile.name,
                                                        'student_class', student_profile.student_class,
                                                        'student_id', student_profile.id,
                                                        'attend_class_count',(SELECT COUNT(student_class_attend.id) FROM student_class_attend WHERE student_class_attend.profile_subject_with_batch_id = profile_subject_with_batch.id)
                                                    )
                                            ) jsdata
                                 FROM profile_subject_with_batch
                                          
                                          INNER JOIN student_profile ON profile_subject_with_batch.profile_id = student_profile.id
                                 GROUP BY profile_subject_with_batch.class_assigned_teacher_batch_id) profile_subject_with_batch
                                ON profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
            WHERE (DATE(class_timetable_with_class_batch_assigned.start_from_date_time) >= '${weekStartDate}' AND DATE(class_timetable_with_class_batch_assigned.start_from_date_time) <= '${weekEndDate}')`;
}

export const actionToGetTeacherAllTimetableClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('id',class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id,
                               'class_id', class_timetable_with_class_batch_assigned.id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'start_from_date_time', class_timetable_with_class_batch_assigned.start_from_date_time,
                               'class_end_date_time', class_timetable_with_class_batch_assigned.class_end_date_time,
                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                               'subject_name', subject.name,
                               'student_class', class_assigned_teacher_batch.student_class,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS classes_data
            from class_timetable_with_class_batch_assigned
                     INNER JOIN class_assigned_teacher_batch on class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                    
            WHERE class_assigned_teacher_batch.teacher_id = '${userId}'`;
}

export const actionToGetStudentAllTimetableClassesQuery = (userId)=>{
    return `SELECT JSON_OBJECT('class_id', class_timetable_with_class_batch_assigned.id,
                               'id',class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id,
                               'subject_id', class_assigned_teacher_batch.subject_id,
                               'batch', class_assigned_teacher_batch.batch,
                               'profile_subject_with_batch_id', profile_subject_with_batch.id,
                               'start_from_date_time', class_timetable_with_class_batch_assigned.start_from_date_time,
                               'class_end_date_time', class_timetable_with_class_batch_assigned.class_end_date_time,
                               'class_end_time', class_assigned_teacher_batch.class_end_time,
                               'is_demo_class', class_assigned_teacher_batch.is_demo_class,
                               'subject_name', subject.name,
                               'teacher_name', app_user.name,
                               'student_class', class_assigned_teacher_batch.student_class,
                               'teacher_id', class_assigned_teacher_batch.teacher_id,
                               'school_board', school_board.name) AS classes_data
            from class_timetable_with_class_batch_assigned
                     INNER JOIN class_assigned_teacher_batch on class_timetable_with_class_batch_assigned.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN school_board ON class_assigned_teacher_batch.school_board = school_board.id
                     INNER JOIN subject ON class_assigned_teacher_batch.subject_id = subject.id
                     LEFT JOIN app_user ON class_assigned_teacher_batch.teacher_id = app_user.id
                     INNER JOIN  profile_subject_with_batch ON profile_subject_with_batch.class_assigned_teacher_batch_id = class_assigned_teacher_batch.id
                     INNER JOIN  student_profile ON student_profile.id = profile_subject_with_batch.profile_id
            WHERE student_profile.created_by = '${userId}'`;
}