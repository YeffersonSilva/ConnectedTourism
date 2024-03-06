# Define la instancia EC2 para el servidor
resource "aws_instance" "server" {
  ami           = "ami-123456" 
  instance_type = "t2.micro"   

  tags = {
    Name = "Server"
  }
}

# Definir la instancia EC2 para el cliente
resource "aws_instance" "client" {
  ami           = "ami-123456"
  instance_type = "t2.micro"   # Elige el tipo de instancia según tus necesidades

  tags = {
    Name = "Client"
  }
}
