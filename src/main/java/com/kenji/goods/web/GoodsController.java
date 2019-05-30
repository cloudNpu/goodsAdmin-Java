package com.kenji.goods.web;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kenji.goods.vo.Goods;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/goods")
public class GoodsController {

    @Autowired
    private HttpServletRequest request;


    @GetMapping
    public ResponseEntity<Object> findAll(@RequestHeader(value = "token") String token) {
        String ret = null;
        List<Goods> goods = new ArrayList<>();
        HashMap result = new HashMap();
//        String url = Config.registryHost + "/invoke?serviceName=USER";
        String url = "http://127.0.0.1:7001";
        try {
            CloseableHttpClient client = HttpClients.createDefault();
            HttpGet httpGet = new HttpGet(url);
            httpGet.addHeader("token", token);
            CloseableHttpResponse response = client.execute(httpGet);

            if (response.getStatusLine().getStatusCode() == org.apache.http.HttpStatus.SC_OK) {
                ret = EntityUtils.toString(response.getEntity());
            }

            if (ret != null) {
                ObjectMapper mapper = new ObjectMapper();
                HashMap resHM = mapper.readValue(ret, new TypeReference<HashMap>() {
                });
                result.put("port", resHM.get("port"));

                List<HashMap> resObj = (List<HashMap>) resHM.get("data");
                for (HashMap r : resObj) {
                    Goods g = new Goods();
                    g.setType((String) r.get("t_name"));
                    g.setTotalUser((Integer) r.get("total"));
                    Integer type_id = (Integer) r.get("type_id");
                    switch (type_id) {
                        case 1: {
                            g.setGoodsName("手枪弹");
                            g.setTotalGoods(g.getTotalUser() * 15);
                            break;
                        }
                        case 2: {
                            g.setGoodsName("步枪弹");
                            g.setTotalGoods(g.getTotalUser() * 20);
                            break;
                        }
                        case 3: {
                            g.setGoodsName("步枪弹");
                            g.setTotalGoods(g.getTotalUser() * 25);
                            break;
                        }

                    }
                    goods.add(g);
                }
                result.put("data", goods);
            }
            return ResponseEntity.ok().body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }
}
