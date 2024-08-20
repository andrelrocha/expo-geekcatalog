export default interface GameCommentReturnDTO {
    id: string;        
    userId: string; 
    username: string;
    rating: number;
    gameId: string;     
    comment: string;
    createdAt: Date;    
    updatedAt: Date;    
}