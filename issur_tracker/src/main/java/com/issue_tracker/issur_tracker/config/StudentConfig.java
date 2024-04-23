package com.issue_tracker.issur_tracker.config;

import com.issue_tracker.issur_tracker.model.Handler;
import com.issue_tracker.issur_tracker.model.Issue;
import com.issue_tracker.issur_tracker.repository.HandlerRepository;
import com.issue_tracker.issur_tracker.repository.IssueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
                    "Yasith",
                    LocalDateTime.of(2024, Month.MARCH, 22, 0, 0),
                    LocalDateTime.of(2024, Month.MARCH, 22, 0, 0),
                    1
            );

            repository.saveAll(
                    List.of(umaya));
        };


    }
    @Bean
    CommandLineRunner handlerDataLoader(HandlerRepository  handlerRespository){
        return args -> {
            Handler Isuru = new Handler(
                    "ISuru",
                    "ISuru@gmail.com",
                    "1231",
                    "Nothing"
            );
            handlerRespository.saveAll(List.of(Isuru));
        };
    }
}
