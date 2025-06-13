package xyz.rusin.choretracker;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/images")
public class ImageApi {
    private final String FILE_PATH = "~/choretracker/images/";

    @PostMapping("/")
    public ImageMetadataDto uploadImage(@RequestParam("image") MultipartFile file) {
        File uploadDir = new File(FILE_PATH);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(FILE_PATH, filename);
        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        }
        catch (IOException exception) {
            throw new RuntimeException(exception);
        }
        return new ImageMetadataDto(filename);
    }

    @GetMapping("/{image:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String image) throws IOException {
        Path filePath = Paths.get(FILE_PATH).resolve(image).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(resource);
    }

}
