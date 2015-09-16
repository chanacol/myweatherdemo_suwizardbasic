<?php

    function send_curl_request($verb, $url, $payload = ''){

        $logger = \APS\LoggerRegistry::get();

        $application = \APS\Request::getController()->getResources("implementing(http://myweatherdemo.com/suwizardbasic/application/1.0)");
        $token = $application[0]->provider_token;

        $headers = array(
                'Content-type: application/json',
                'x-provider-token: '. $token
        );

        $ch = curl_init();

        curl_setopt_array($ch, array(
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_CUSTOMREQUEST => $verb,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => json_encode($payload)
        ));

        $response = json_decode(curl_exec($ch));
        $logger->debug("Response was: " . print_r($response, true));

        curl_close($ch);

        return $response;
    }
?>
