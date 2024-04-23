package com.issue_tracker.issur_tracker.config;

import com.issue_tracker.issur_tracker.model.Handler;
import com.issue_tracker.issur_tracker.model.Issue;
import com.issue_tracker.issur_tracker.repository.HandlerRepository;
import com.issue_tracker.issur_tracker.repository.IssueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

@Configuration // this is used to add values to DB
public class StudentConfig {
    @Bean
    CommandLineRunner commandLineRunner(IssueRepository repository) {
        return args -> {

            Issue umaya = new Issue(
                    "umaya@gmail.com",
                    "Isuru's Subject",
                    "This is the description",
                    "Jane Smith",
                    LocalDateTime.of(2024, Month.MARCH, 22, 0, 0),
                    LocalDateTime.of(2024, Month.MARCH, 22, 0, 0),
                    1
            );

            repository.saveAll(
                    List.of(umaya));
        };


    }
    @Bean
    CommandLineRunner handlerDataLoader(HandlerRepository handlerRepository) {
        return args -> {
            Handler handler1 = new Handler(
                    "John Doe",
                    "john.doe@example.com",
                    "123456",
                    "Developer",
"https://firebasestorage.googleapis.com/v0/b/issue-tracker-9b307.appspot.com/o/OIP%20(1).jpeg?alt=media&token=751e4769-576a-4ef8-b694-ea6cb88ab855"
            );

            Handler handler2 = new Handler(
                    "Jane Smith",
                    "jane.smith@example.com",
                    "654321",
                    "Analyst",
                    "https://firebasestorage.googleapis.com/v0/b/issue-tracker-9b307.appspot.com/o/OIP%20(1).jpeg?alt=media&token=751e4769-576a-4ef8-b694-ea6cb88ab855"

            );

            Handler handler3 = new Handler(
                    "Michael Johnson",
                    "michael.johnson@example.com",
                    "987654",
                    "UI/UX Designer",
                    "https://firebasestorage.googleapis.com/v0/b/issue-tracker-9b307.appspot.com/o/OIP%20(1).jpeg?alt=media&token=751e4769-576a-4ef8-b694-ea6cb88ab855"
            );

            handlerRepository.saveAll(List.of(handler1, handler2, handler3));
        };
    }

//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

}
