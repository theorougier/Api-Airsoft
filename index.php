<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
$app = AppFactory::create();
// Add Routing Middleware
$app->addRoutingMiddleware();

$conn = new PDO('mysql:host=127.0.0.1;dbname=test', 'root', '', [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Define app routes
// $app->get('/event/{id}', function (Request $request, Response $response, $args) use ($conn) {
//         $query = $conn->prepare("SELECT id, name, inscrit, nombre_inscrit FROM event WHERE id= :id");
//         $query->bindValue(':id', $args['id']);
//         $query->execute();
//         $data = $query->fetchAll(PDO::FETCH_ASSOC);
//         $response->getBody()->write(json_encode('test'));
//         return $response;
// });

$app->get('/hello/{name}', function (Request $request, Response $response, $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->run();