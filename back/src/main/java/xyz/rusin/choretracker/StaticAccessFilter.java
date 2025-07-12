package xyz.rusin.choretracker;

import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Paths;

@Component
@ConditionalOnProperty(name = "access.control", havingValue = "true")
@Order(1)
public class StaticAccessFilter implements Filter {
    @Value("${data.folder}")
    private String dataFolderPath;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String path = request.getRequestURI();

        // Only filter static resources (adjust as needed)
        if (path.startsWith("/static/") || isRootStaticFile(path)) {
            String remoteAddr = request.getRemoteAddr();

            if (Helpers.isLocalNetwork(remoteAddr) || hasLoginCookie(request)) {
                chain.doFilter(req, res);
            } else {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Forbidden");
            }
        } else {
            chain.doFilter(req, res);
        }
    }

    private boolean isRootStaticFile(String path) {
        // For files like /index.html, /favicon.ico, etc.
        return path.matches("^/[^/]+\\.[a-zA-Z0-9]+$");
    }

    private boolean hasLoginCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return false;
        for (Cookie cookie : cookies) {
            if ("choretracker".equals(cookie.getName()) &&
                    Helpers.getOrCreateUuid(Paths.get(dataFolderPath)).toString().equals(cookie.getValue())) {
                return true;
            }
        }
        return false;
    }
}