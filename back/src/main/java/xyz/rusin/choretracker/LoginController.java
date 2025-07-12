package xyz.rusin.choretracker;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Paths;

@RestController
@ConditionalOnProperty(name = "enable.login", havingValue = "true")
public class LoginController {
    @Value("${data.folder}")
    private String dataFolderPath;

    @GetMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response) {
        String remoteAddr = request.getRemoteAddr();

        // Allow only local network (e.g., 127.0.0.1, 10.x.x.x, 192.168.x.x)
        if (!Helpers.isLocalNetwork(remoteAddr)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return "Forbidden";
        }

        // Set a cookie
        Cookie cookie = new Cookie("choretracker", Helpers.getOrCreateUuid(Paths.get(dataFolderPath)).toString());
        cookie.setPath("/");
        cookie.setHttpOnly(false); // Set to true if you want JS-inaccessible
        response.addCookie(cookie);

        return "login successfull";
    }

}