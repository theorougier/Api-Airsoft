<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
$app = AppFactory::create();
// Add Routing Middleware
$app->addRoutingMiddleware();

$conn = new PDO('mysql:host=airsoft-bot-api.mysql.eu2.frbit.com;dbname=airsoft-bot-api', 'airsoft-bot-api', '8Dg05Dk-W-IwmevNd4no1EIv', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Define app routes
$app->get('/event/{id}', function (Request $request, Response $response, $args) use ($conn) {
        $query = $conn->prepare("SELECT id, name, inscrit, nombre_inscrit FROM event WHERE id= :id");
        $query->bindValue(':id', $args['id']);
        $query->execute();
        $data = $query->fetchAll(PDO::FETCH_ASSOC);
        $response->getBody()->write(json_encode([$data]));
        return $response;
});