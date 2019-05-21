package com.kenji.goods.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kenji.goods.config.Config;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody Map user) {
        String url = Config.registryHost + "/auth/login";

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        httpPost.addHeader(HTTP.CONTENT_TYPE, "application/json");

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            StringEntity se = new StringEntity(objectMapper.writeValueAsString(user));
            se.setContentType("text/json");
            se.setContentEncoding(new BasicHeader(HTTP.CONTENT_TYPE, "application/json"));
            httpPost.setEntity(se);

            CloseableHttpResponse response = null;
            response = client.execute(httpPost);
            if (response.getStatusLine().getStatusCode() == org.apache.http.HttpStatus.SC_OK) {
                return ResponseEntity.ok().body(EntityUtils.toString(response.getEntity()));
            } else {
                return ResponseEntity.badRequest().body("");
            }

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("");
        }

    }
}
